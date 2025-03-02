import { Router } from 'express';
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from '../controllers/message.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

const router = Router();
/**
 * @swagger
 * /api/v1/messages/send:
 *   post:
 *     summary: Send a message
 *     description: Sends a message in a session and emits it via Socket.io.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 example: "67c4ae7e25e65067886fc0eb"
 *               content:
 *                 type: string
 *                 example: "This is my message"
 *     responses:
 *       201:
 *         description: Message sent successfully.
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
 *                   example: "Message sent successfully"
 *                 message:
 *                   type: object
 *                   properties:
 *                     sender:
 *                       type: string
 *                       example: "67c4ae7e25e65067886fc0eb"
 *                     content:
 *                       type: string
 *                       example: "This is my message"
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-02T19:33:40.952Z"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Message content cannot be empty.
 *       404:
 *         description: Session not found.
 *       401:
 *         description: Unauthorized request.
 */

// Route to send a message
router.post('/send', verifyJWT, sendMessage);
/**
 * @swagger
 * /api/v1/messages/get-messages/{sessionId}:
 *   get:
 *     summary: Get messages of a session
 *     description: Retrieves all messages from a session, including sender details.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the session to retrieve messages from.
 *     responses:
 *       200:
 *         description: Messages retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: string
 *                   example: "Messages retrieved successfully"
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67c4ae7e25e65067886fc0eb"
 *                       sender:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "67c4ae7e25e65067886fc0eb"
 *                           username:
 *                             type: string
 *                             example: "salman"
 *                       content:
 *                         type: string
 *                         example: "Hello, how are you?"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-02T19:33:40.952Z"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Session not found.
 *       401:
 *         description: Unauthorized request.
 */

// Route to get messages
router.get('/get-messages/:sessionId', verifyJWT, getMessages);
/**
 * @swagger
 * /api/v1/messages/delete-message/{sessionId}/{messageId}:
 *   delete:
 *     summary: Delete a message from a session
 *     description: Removes a specific message from a session's message history.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the session containing the message.
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to delete.
 *     responses:
 *       200:
 *         description: Message deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: string
 *                   example: "Message deleted successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Session or message not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 error:
 *                   type: string
 *                   example: "Message not found"
 *       401:
 *         description: Unauthorized request.
 *       500:
 *         description: Internal server error.
 */

// Route to delete a message
router.delete('/delet-message/:sessionId/:messageId', verifyJWT, deleteMessage);

export default router;
