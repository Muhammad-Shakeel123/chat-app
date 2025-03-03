import { Router } from 'express';
import {
  logoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  getActiveUsers,
} from '../controllers/user.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middelware.js';

const router = Router();
/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the authenticated user by clearing cookies and removing the refresh token.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *         headers:
 *           Set-Cookie:
 *             description: "Clears accessToken and refreshToken cookies"
 *             schema:
 *               type: string
 *               example: "accessToken=; HttpOnly; Secure; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   example: {}
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized - User is not logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized - No valid token found"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Something went wrong while logging out"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.route('/logout').post(verifyJWT, logoutUser);

/**
 * @swagger
 * /api/v1/auth/change-password:
 *   post:
 *     summary: Change user password
 *     description: Allows authenticated users to change their current password.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []  # JWT authentication required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 example: "oldpassword123"
 *                 description: The user's current password.
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: "NewSecurePass!23"
 *                 description: The new password (must be at least 8 characters long).
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   example: {}
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request (invalid input or missing fields).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Old password and new password are required"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized (incorrect old password).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Old password is incorrect"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Something went wrong while changing the password"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.route('/change-password').post(verifyJWT, changeCurrentPassword);

/**
 * @swagger
 * /api/v1/auth/current-user:
 *   get:
 *     summary: Get the currently authenticated user
 *     description: Fetches details of the logged-in user based on the JWT token.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []  # Requires JWT authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved the current user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67c5d33ff091d1a457eb1c6d"
 *                     fullName:
 *                       type: string
 *                       example: "Muhammad Shakeel"
 *                     username:
 *                       type: string
 *                       example: "muhammadshakeel"
 *                     email:
 *                       type: string
 *                       example: "shakeel@gmail.com"
 *                     country:
 *                       type: string
 *                       example: "Pakistan"
 *                     status:
 *                       type: string
 *                       example: "available"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     avatar:
 *                       type: string
 *                       format: uri
 *                       example: "http://res.cloudinary.com/dmvwgos9j/image/upload/v1741017919/kgkvlalvclf0g5xavvc7.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T16:05:19.576Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T17:17:18.916Z"
 *                 message:
 *                   type: string
 *                   example: "Current User fetched successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized - Token missing or invalid"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Something went wrong while fetching user details"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.route('/current-user').get(verifyJWT, getCurrentUser);

/**
 * @swagger
 * /api/v1/auth/update-account:
 *   patch:
 *     summary: Update user account details
 *     description: Allows authenticated users to update their full name, email, username, and country.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []  # Requires JWT authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - username
 *               - country
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Muhammad Shakeel"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "shakeel@gmail.com"
 *               username:
 *                 type: string
 *                 example: "muhammadshakeel"
 *               country:
 *                 type: string
 *                 example: "Pakistan"
 *     responses:
 *       200:
 *         description: Successfully updated account details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67c5d33ff091d1a457eb1c6d"
 *                     fullName:
 *                       type: string
 *                       example: "abcd"
 *                     username:
 *                       type: string
 *                       example: "xyz"
 *                     email:
 *                       type: string
 *                       example: "abcd@gmail.com"
 *                     country:
 *                       type: string
 *                       example: "India"
 *                     status:
 *                       type: string
 *                       example: "available"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     avatar:
 *                       type: string
 *                       format: uri
 *                       example: "http://res.cloudinary.com/dmvwgos9j/image/upload/v1741017919/kgkvlalvclf0g5xavvc7.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T16:05:19.576Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T17:24:20.713Z"
 *                 message:
 *                   type: string
 *                   example: "Account details updated successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad Request - Missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Please provide all fields"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized - Token missing or invalid"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Something went wrong while updating account details"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.route('/update-account').patch(verifyJWT, updateAccountDetails);

/**
 * @swagger
 * /api/v1/auth/avatar:
 *   patch:
 *     summary: Update user avatar
 *     description: Allows authenticated users to upload and update their profile avatar.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []  # Requires JWT authentication
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Avatar image file to be uploaded.
 *     responses:
 *       200:
 *         description: Successfully updated avatar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67c5d33ff091d1a457eb1c6d"
 *                     fullName:
 *                       type: string
 *                       example: "abcd"
 *                     username:
 *                       type: string
 *                       example: "xyz"
 *                     email:
 *                       type: string
 *                       example: "abcd@gmail.com"
 *                     country:
 *                       type: string
 *                       example: "India"
 *                     status:
 *                       type: string
 *                       example: "available"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     avatar:
 *                       type: string
 *                       format: uri
 *                       example: "http://res.cloudinary.com/dmvwgos9j/image/upload/v1741022947/cpuednxzsjiqsblrfate.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T16:05:19.576Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T17:29:07.637Z"
 *                 message:
 *                   type: string
 *                   example: "Avatar updated successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad Request - Avatar file missing or upload failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Please provide an avatar"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized - Token missing or invalid"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Something went wrong while updating avatar"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router
  .route('/avatar')
  .patch(verifyJWT, upload.single('avatar'), updateUserAvatar);

  /**
 * @swagger
 * /api/v1/auth/active-users:
 *   get:
 *     summary: Get all active users
 *     description: Fetches a list of all users who are not offline.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved active users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67c5d2c2f091d1a457eb1c65"
 *                       fullName:
 *                         type: string
 *                         example: "Salman"
 *                       username:
 *                         type: string
 *                         example: "salman"
 *                       email:
 *                         type: string
 *                         example: "salman@gmail.com"
 *                       country:
 *                         type: string
 *                         example: "Pakistan"
 *                       status:
 *                         type: string
 *                         example: "available"
 *                       role:
 *                         type: string
 *                         example: "user"
 *                       avatar:
 *                         type: string
 *                         format: uri
 *                         example: "http://res.cloudinary.com/dmvwgos9j/image/upload/v1741017793/eo3bnjssxtwgtaxfsctj.jpg"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-03T16:03:14.177Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-03T16:03:14.177Z"
 *                 message:
 *                   type: string
 *                   example: "Active users fetched successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: No active users found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "No active users found"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Something went wrong while fetching active users"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
  router.route('/active-users').get(getActiveUsers);

export default router;
