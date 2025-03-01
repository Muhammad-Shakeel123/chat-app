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
