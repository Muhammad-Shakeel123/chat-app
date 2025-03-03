import { Router } from 'express';
import { createSession, getSession, endSession } from '../controllers/session.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();
/**
 * @swagger
 * /api/v1/session/create:
 *   post:
 *     summary: Create a new chat or video session
 *     description: Establishes a new session between two users for chatting or video calls.
 *     tags:
 *       - Sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user1:
 *                 type: string
 *                 format: uuid
 *                 example: "67be25914d759b3f1f540a7d"
 *               user2:
 *                 type: string
 *                 format: uuid
 *                 example: "67bf6768477060dfb703e963"
 *               sessionType:
 *                 type: string
 *                 enum: ["chat", "video"]
 *                 example: "video"
 *     responses:
 *       201:
 *         description: Session created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67c5da4f4632bb5aeea80816"
 *                     user1:
 *                       type: string
 *                       example: "67be25914d759b3f1f540a7d"
 *                     user2:
 *                       type: string
 *                       example: "67bf6768477060dfb703e963"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     sessionType:
 *                       type: string
 *                       example: "video"
 *                     roomId:
 *                       type: string
 *                       nullable: true
 *                       example: "room_1741017919288"
 *                     startedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T16:35:27.288Z"
 *                     messages:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                 message:
 *                   type: string
 *                   example: "Session created successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: Session already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Session already exists"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67c5da4f4632bb5aeea80816"
 *                     user1:
 *                       type: string
 *                       example: "67be25914d759b3f1f540a7d"
 *                     user2:
 *                       type: string
 *                       example: "67bf6768477060dfb703e963"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     sessionType:
 *                       type: string
 *                       example: "video"
 *                     roomId:
 *                       type: string
 *                       nullable: true
 *                       example: "room_1741017919288"
 *                     startedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T16:35:27.288Z"
 *                     messages:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Session type is required.
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
 *                   example: "Session type is required"
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
 *                   example: "Something went wrong while creating session"
 *                 success:
 *                   type: boolean
 *                   example: false
 */


// Route to create a new session
router.post('/create',verifyJWT, createSession);
/**
 * @swagger
 * /api/v1/session/{sessionId}:
 *   get:
 *     summary: Retrieve session details by session ID
 *     description: Fetches session details including users, status, and messages.
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "67c5da4f4632bb5aeea80816"
 *         description: The unique ID of the session to retrieve.
 *     responses:
 *       200:
 *         description: Session retrieved successfully.
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
 *                       example: "67c5da4f4632bb5aeea80816"
 *                     user1:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "67be25914d759b3f1f540a7d"
 *                         username:
 *                           type: string
 *                           example: "john_doe"
 *                     user2:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "67bf6768477060dfb703e963"
 *                         username:
 *                           type: string
 *                           example: "jane_smith"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     sessionType:
 *                       type: string
 *                       example: "video"
 *                     startedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T16:35:27.288Z"
 *                     endedAt:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       example: null
 *                     messages:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T16:35:27.310Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T16:35:27.310Z"
 *                 message:
 *                   type: string
 *                   example: "Session retrieved successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Session not found.
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
 *                   example: "Session not found"
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
 *                   example: "Something went wrong while retrieving session"
 *                 success:
 *                   type: boolean
 *                   example: false
 */

// Route to get a session by ID
router.get('/:sessionId', getSession);
/**
 * @swagger
 * /api/v1/session/end/{sessionId}:
 *   delete:
 *     summary: End an active session
 *     description: Marks a session as 'ended' and records the end time.
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "67c5da4f4632bb5aeea80816"
 *         description: The unique ID of the session to be ended.
 *     responses:
 *       200:
 *         description: Session ended successfully.
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
 *                       example: "67c5da4f4632bb5aeea80816"
 *                     user1:
 *                       type: string
 *                       example: "67be25914d759b3f1f540a7d"
 *                     user2:
 *                       type: string
 *                       example: "67bf6768477060dfb703e963"
 *                     status:
 *                       type: string
 *                       example: "ended"
 *                     sessionType:
 *                       type: string
 *                       example: "video"
 *                     startedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T16:35:27.288Z"
 *                     endedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T16:54:03.940Z"
 *                     messages:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T16:35:27.310Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T16:54:03.940Z"
 *                 message:
 *                   type: string
 *                   example: "Session ended successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Session not found.
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
 *                   example: "Session not found"
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
 *                   example: "Something went wrong while ending session"
 *                 success:
 *                   type: boolean
 *                   example: false
 */


// Route to end a session
router.delete('/end/:sessionId', endSession);

export default router;
