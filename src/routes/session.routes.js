import { Router } from 'express';
import { createSession, getSession, endSession } from '../controllers/session.controller.js';

const router = Router();
/**
 * @swagger
 * /api/v1/sessions/create:
 *   post:
 *     summary: Create a new session
 *     description: Initiates a chat or video session between two users.
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user1:
 *                 type: string
 *                 example: "67c4ae7e25e65067886fc0eb"
 *               user2:
 *                 type: string
 *                 example: "67c4ae7e25e65067886fc0ec"
 *               sessionType:
 *                 type: string
 *                 enum: ["video", "chat"]
 *                 example: "chat"
 *             required:
 *               - user1
 *               - user2
 *               - sessionType
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
 *                       example: "67c4ae7e25e65067886fc0ed"
 *                     user1:
 *                       type: string
 *                       example: "67c4ae7e25e65067886fc0eb"
 *                     user2:
 *                       type: string
 *                       example: "67c4ae7e25e65067886fc0ec"
 *                     sessionType:
 *                       type: string
 *                       example: "chat"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     startedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-02T19:33:40.952Z"
 *                     roomId:
 *                       type: string
 *                       nullable: true
 *                       example: null
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
 *                 data:
 *                   type: object
 *                   example: { "_id": "67c4ae7e25e65067886fc0ed", "user1": "67c4ae7e25e65067886fc0eb", "user2": "67c4ae7e25e65067886fc0ec", "sessionType": "chat", "status": "active", "startedAt": "2025-03-02T19:33:40.952Z", "roomId": null }
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Session type is required.
 *       401:
 *         description: Unauthorized request.
 *       500:
 *         description: Internal server error.
 */

// Route to create a new session
router.post('/create', createSession);
/**
 * @swagger
 * /api/v1/sessions/{sessionId}:
 *   get:
 *     summary: Retrieve session details
 *     description: Fetches session details including user information.
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the session to retrieve.
 *         example: "67c4ae7e25e65067886fc0ed"
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
 *                       example: "67c4ae7e25e65067886fc0ed"
 *                     user1:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "67c4ae7e25e65067886fc0eb"
 *                         username:
 *                           type: string
 *                           example: "JohnDoe"
 *                     user2:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "67c4ae7e25e65067886fc0ec"
 *                         username:
 *                           type: string
 *                           example: "JaneDoe"
 *                     sessionType:
 *                       type: string
 *                       example: "chat"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     startedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-02T19:33:40.952Z"
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
 *       401:
 *         description: Unauthorized request.
 *       500:
 *         description: Internal server error.
 */

// Route to get a session by ID
router.get('/:sessionId', getSession);
/**
 * @swagger
 * /api/v1/sessions/end/{sessionId}:
 *   delete:
 *     summary: End an active session
 *     description: Marks a session as ended and sets the end timestamp.
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the session to be ended.
 *         example: "67c4ae7e25e65067886fc0ed"
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
 *                 message:
 *                   type: string
 *                   example: "Session ended successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67c4ae7e25e65067886fc0ed"
 *                     status:
 *                       type: string
 *                       example: "ended"
 *                     endedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-02T20:00:00.000Z"
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
 *       401:
 *         description: Unauthorized request.
 *       500:
 *         description: Internal server error.
 */

// Route to end a session
router.delete('/end/:sessionId', endSession);

export default router;
