import { Router } from 'express';
import { createSession, getSession, endSession } from '../controllers/session.controller.js';

const router = Router();

// Route to create a new session
router.post('/create', createSession);

// Route to get a session by ID
router.get('/:sessionId', getSession);

// Route to end a session
router.delete('/end/:sessionId', endSession);

export default router;
