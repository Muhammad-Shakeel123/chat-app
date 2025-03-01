import Router from 'express';
import { upload } from '../middlewares/multer.middelware.js';

import {
  registerUser,
  userLogin,
  refreshAccessToken,
} from '../controllers/auth.controller.js';

const router = Router()
router.route('/register').post(
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1,
    }
  ]),
  registerUser,
);
router.route('/login').post(userLogin);
router.route('/refresh-token').post(refreshAccessToken);
export default router;
