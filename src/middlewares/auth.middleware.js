// this middleware show that user is present or not
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiErrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // we will take accesstoken from the cookies or header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Access token is missing or invalid");

    }

    // verify the from the jwt
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Access token is invalid or expired");

    }

    // if user is present then we will add user to the req object
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export default verifyJWT;
