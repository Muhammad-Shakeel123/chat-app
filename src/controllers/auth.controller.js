import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';

import jwt from 'jsonwebtoken';

const generateAccessAndRefreshTokens = async userId => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken(); // Corrected variable name
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      'Something went wrong while generating Refresh and Access tokens',
    );
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, country, fullName } = req.body;

  // Check for missing fields
  if (
    [username, email, password, country, fullName].some(field => !field?.trim())
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(400, 'Username or email already exists');
  }

  // Check if avatar exists
  if (!req.files || !req.files.avatar || !req.files.avatar[0]) {
    throw new ApiError(400, 'Avatar is required');
  }

  const fileBuffer = req.files.avatar[0].buffer; // Get file buffer
  const fileMimeType = req.files.avatar[0].mimetype; // Get file type

  // Upload to Cloudinary
  const avatar = await uploadOnCloudinary(fileBuffer, fileMimeType);
  if (!avatar?.secure_url) {
    throw new ApiError(500, 'Avatar upload failed');
  }

  // Create user
  const user = await User.create({
    fullName,
    username,
    email,
    password,
    country,
    avatar: avatar.secure_url, // Save Cloudinary URL
  });

  return res
    .status(201)
    .json(new ApiResponse(201, 'User created successfully', user));
});


const userLogin = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if (!email && !username) {
    throw new ApiError(400, 'Username or Email are required');
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, 'User does not exist');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Generate tokens
  const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  // 🔹 Update lastActive timestamp
  user.lastActive = new Date();
  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        'User logged in successfully',
      ),
    );
});


const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    // check for errors
    throw new ApiError(401, 'Unauthorized request');
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, 'Invalid refresh token');
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, 'Refresh token is expired or used');
    }
    const options = {
      httpOnly: true,
      secure: true,
    };

    const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(
      user._id,
    );
    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { refreshToken, accessToken },
          'Refresh token successfully',
        ),
      );
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid refresh token');
  }
});

export { registerUser, userLogin, refreshAccessToken };
