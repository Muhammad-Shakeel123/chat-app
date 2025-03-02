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
 * /api/v1/users/logout:
 *   post:
 *     summary: Logout user
 *     description: Clears JWT tokens and logs out the user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

router.route('/logout').post(verifyJWT, logoutUser);
/**
 * @swagger
 * /api/v1/users/change-password:
 *   post:
 *     summary: Change current user's password
 *     description: Allows authenticated users to change their password.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *                 example: "OldPass123"
 *               newPassword:
 *                 type: string
 *                 example: "NewPass456"
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       401:
 *         description: Incorrect old password.
 *       500:
 *         description: Internal server error.
 */

router.route('/change-password').post(verifyJWT, changeCurrentPassword);
/**
 * @swagger
 * /api/v1/users/current-user:
 *   get:
 *     summary: Get current user details
 *     description: Fetches details of the currently logged-in user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

router.route('/current-user').get(verifyJWT, getCurrentUser);
/**
 * @swagger
 * /api/v1/users/update-account:
 *   patch:
 *     summary: Update user account details
 *     description: Allows users to update their personal details.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *                 example: "shakeel@example.com"
 *               username:
 *                 type: string
 *                 example: "shakeel_dev"
 *               country:
 *                 type: string
 *                 example: "Pakistan"
 *     responses:
 *       200:
 *         description: Account details updated successfully.
 *       400:
 *         description: Missing required fields.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

router.route('/update-account').patch(verifyJWT, updateAccountDetails);
/**
 * @swagger
 * /api/v1/users/avatar:
 *   patch:
 *     summary: Update user avatar
 *     description: Uploads and updates the user's profile avatar.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated successfully.
 *       400:
 *         description: No avatar provided or upload failed.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

router
  .route('/avatar')
  .patch(verifyJWT, upload.single('avatar'), updateUserAvatar);
  /**
 * @swagger
 * /api/v1/users/active-users:
 *   get:
 *     summary: Get active users
 *     description: Fetches all users who are currently online.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Active users retrieved successfully.
 *       404:
 *         description: No active users found.
 *       500:
 *         description: Internal server error.
 */

  router.route('/active-users').get(getActiveUsers);

export default router;
