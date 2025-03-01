import { Router } from 'express';
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from '../controllers/message.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();

// Route to send a message
router.post('/send', verifyJWT, sendMessage);

// Route to get messages
router.get('/get-messages/:sessionId', verifyJWT, getMessages);

// Route to delete a message
router.delete('/delet-message/:sessionId/:messageId', verifyJWT, deleteMessage);

export default router;
