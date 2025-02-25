import Router from 'express';
import { upload } from '../middlewares/multer.middelware.js';
// import verifyJWT from '../middlewares/auth.middleware.js';
import { registerUser } from '../controllers/auth.controller.js';

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
export default router;

