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
 * /api/v1/message/send:
 *   post:
 *     summary: Send a message in a session
 *     description: Allows a user to send a message in an active session. The message will be saved in the session's message array and broadcasted via Socket.io.
 *     tags:
 *       - Messages
 *     security:
 *       - BearerAuth: []  # Requires JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *               - content
 *             properties:
 *               sessionId:
 *                 type: string
 *                 format: uuid
 *                 example: "67c5da4f4632bb5aeea80816"
 *                 description: The unique session ID where the message is sent.
 *               content:
 *                 type: string
 *                 example: "Hello, how are you?"
 *                 description: The message content.
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
 *                       example: "67c5d33ff091d1a457eb1c6d"
 *                     content:
 *                       type: string
 *                       example: "hi"
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-03T16:58:13.036Z"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Message content cannot be empty.
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
 *                   example: "Message content cannot be empty"
 *                 success:
 *                   type: boolean
 *                   example: false
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
 *                   example: "Something went wrong while sending message"
 *                 success:
 *                   type: boolean
 *                   example: false
 */

// Route to send a message
router.post('/send', verifyJWT, sendMessage);

/**
 * @swagger
 * /api/v1/message/get-messages/{sessionId}:
 *   get:
 *     summary: Retrieve messages from a session
 *     description: Fetch all messages from a given session, including sender details (username and ID).
 *     tags:
 *       - Messages
 *     security:
 *       - BearerAuth: []  # Requires JWT authentication
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "67c5da4f4632bb5aeea80816"
 *         description: The unique session ID to fetch messages from.
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
 *                 message:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67c5df9480649c9cde51179f"
 *                       sender:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "67c5d33ff091d1a457eb1c6d"
 *                           username:
 *                             type: string
 *                             example: "muhammadshakeel"
 *                       content:
 *                         type: string
 *                         example: "Hello, this is my message."
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-03T16:58:13.036Z"
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
 *                   example: "Something went wrong while retrieving messages"
 *                 success:
 *                   type: boolean
 *                   example: false
 */

// Route to get messages
router.get('/get-messages/:sessionId', verifyJWT, getMessages);

/**
 * @swagger
 * /api/v1/message/delet-message/{sessionId}/{messageId}:
 *   delete:
 *     summary: Delete a message from a session
 *     description: Remove a specific message from a chat session.
 *     tags:
 *       - Messages
 *     security:
 *       - BearerAuth: []  # Requires JWT authentication
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "67c5da4f4632bb5aeea80816"
 *         description: The unique session ID.
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "67c5dfa580649c9cde5117a4"
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
 *       400:
 *         description: Invalid ID format.
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
 *                   example: "Invalid session or message ID format"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Message not found.
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
 *                   example: "Message not found or already deleted"
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
 *                   example: "Something went wrong while deleting the message"
 *                 success:
 *                   type: boolean
 *                   example: false
 */

// Route to delete a message
router.delete('/delet-message/:sessionId/:messageId', verifyJWT, deleteMessage);

export default router;
