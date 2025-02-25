import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import uploadOnCloudnary from '../utils/cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password,country, fullName } = req.body;

  // Check for missing fields
  if ([username, email, password,country, fullName].some(field => !field?.trim())) {
    throw new ApiError(400, 'All fields are required');
  }

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(400, 'Username or email already exists');
  }

  // Check and upload avatar
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar is required');
  }

  const avatar = await uploadOnCloudnary(avatarLocalPath);
  if (!avatar?.url) {
    throw new ApiError(500, 'Avatar upload failed');
  }

  // Create user
  const user = await User.create({
    fullName,
    username,
    email,
    password,
    country,
    avatar: avatar.url,
  });

  // Retrieve user data without sensitive fields
  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );
  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }

  return res
    .status(201)
    .json(new ApiResponse(201, 'User created successfully', createdUser));
});

export { registerUser };
