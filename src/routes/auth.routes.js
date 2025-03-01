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
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request (e.g., Email already exists)
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
