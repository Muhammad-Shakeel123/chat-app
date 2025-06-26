import Router from 'express';
import { upload } from '../middlewares/multer.middelware.js';

import {
  registerUser,
  userLogin,
  refreshAccessToken,
} from '../controllers/auth.controller.js';

const router = Router();

// ✅ Add this test route to verify if `/api/v1/auth` is working
router.get('/', (req, res) => {
  res.send('Auth API is working!');
});
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with an avatar upload. The avatar image is required and will be stored on Cloudinary.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - country
 *               - fullName
 *               - avatar
 *             properties:
 *               username:
 *                 type: string
 *                 description: "Unique username for the user"
 *                 example: "salman"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "Valid email address for the user"
 *                 example: "salman@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: "User's password (must be strong)"
 *                 example: "SecurePass123!"
 *               country:
 *                 type: string
 *                 description: "User's country of residence"
 *                 example: "Pakistan"
 *               fullName:
 *                 type: string
 *                 description: "User's full legal name"
 *                 example: "Salman Khan"
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: "Profile picture upload (required)"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67c4ae7e25e65067886fc0eb"
 *                     fullName:
 *                       type: string
 *                       example: "Salman Khan"
 *                     username:
 *                       type: string
 *                       example: "salman"
 *                     email:
 *                       type: string
 *                       example: "salman@gmail.com"
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
 *                       example: "https://res.cloudinary.com/dmvwgos9j/image/upload/v1740942973/sample.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-02T19:16:14.018Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-02T19:16:14.018Z"
 *       400:
 *         description: Bad request (missing fields or invalid input)
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
 *                   example: "All fields are required"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       409:
 *         description: Conflict (Username or email already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: "Username or email already exists"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error (Avatar upload failed or DB error)
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
 *                   example: "Something went wrong while registering the user"
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.route('/register').post(
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1,
    },
  ]),
  registerUser,
);
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticates a user with email or username and password, returning access and refresh tokens.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "shakeel@gmail.com"
 *               username:
 *                 type: string
 *                 example: "muhammadshakeel"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: User logged in successfully
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
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "67c5d33ff091d1a457eb1c6d"
 *                         fullName:
 *                           type: string
 *                           example: "Muhammad Shakeel"
 *                         username:
 *                           type: string
 *                           example: "muhammadshakeel"
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "shakeel@gmail.com"
 *                         country:
 *                           type: string
 *                           example: "Pakistan"
 *                         status:
 *                           type: string
 *                           example: "available"
 *                         role:
 *                           type: string
 *                           example: "user"
 *                         avatar:
 *                           type: string
 *                           format: uri
 *                           example: "http://res.cloudinary.com/dmvwgos9j/image/upload/v1741017919/kgkvlalvclf0g5xavvc7.jpg"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-03-03T16:05:19.576Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-03-03T16:30:14.356Z"
 *                         __v:
 *                           type: integer
 *                           example: 0
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 message:
 *                   type: string
 *                   example: "User logged in successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing required fields (username/email or password)
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
 *                   example: "Username or Email are required"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Invalid credentials
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
 *                   example: "Invalid credentials"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: User does not exist
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
 *                   example: "User does not exist"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error
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
 *                   example: "Something went wrong while logging in"
 *                 success:
 *                   type: boolean
 *                   example: false
 */

router.route('/login').post(userLogin);

/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Refresh Access Token
 *     description: Generates a new access token and refresh token using a valid refresh token.
 *     tags:
 *       - Authentication
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: New access and refresh tokens generated successfully.
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
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 message:
 *                   type: string
 *                   example: "Refresh token successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized or invalid refresh token.
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
 *                   example: "Invalid refresh token"
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
 *                   example: "Something went wrong while refreshing token"
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: refreshToken
 */

router.route('/refresh-token').post(refreshAccessToken);

export default router;
