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
 *     description: Creates a new user account with an avatar upload.
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
 *                 example: "salman"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "salman@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securepassword123"
 *               country:
 *                 type: string
 *                 example: "Pakistan"
 *               fullName:
 *                 type: string
 *                 example: "Salman Khan"
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: "User avatar image file"
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
 *                 data:
 *                   type: string
 *                   example: "User created successfully"
 *                 message:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67c4ae7e25e65067886fc0eb"
 *                     fullName:
 *                       type: string
 *                       example: "Salman"
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
 *                       example: "http://res.cloudinary.com/dmvwgos9j/image/upload/v1740942973/tlq3zn81wusudoix83ua.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-02T19:16:14.018Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-02T19:16:14.018Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 success:
 *                   type: boolean
 *                   example: true
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
router.route('/login').post(userLogin);
router.route('/refresh-token').post(refreshAccessToken);

export default router;
