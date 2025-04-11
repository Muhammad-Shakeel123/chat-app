import express from 'express';
import { createRoom, nextChat } from '../controllers/webrtc.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: WebRTC
 *   description: WebRTC Video Chat API
 */

/**
 * @swagger
 * /api/v1/webrtc/create-room:
 *   post:
 *     summary: Match users in a WebRTC room or add to the waiting queue
 *     description: Matches a user with another waiting user or adds them to the queue.
 *     tags: [WebRTC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "67f805b72277c8ff63f31526"
 *     responses:
 *       201:
 *         description: Successfully matched with another user.
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
 *                   example: "Matched successfully"
 *                 message:
 *                   type: object
 *                   properties:
 *                     roomId:
 *                       type: string
 *                       example: "room_1744394970056"
 *                     newSession:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "67f95ada594c245c9575286d"
 *                         user1:
 *                           type: string
 *                           example: "67f802ea9e4a651b3c48bccf"
 *                         user2:
 *                           type: string
 *                           example: "67f805b72277c8ff63f31526"
 *                         status:
 *                           type: string
 *                           example: "active"
 *                         startedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-04-11T18:09:30.056Z"
 *                         endedAt:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *                         sessionType:
 *                           type: string
 *                           example: "video"
 *                         roomId:
 *                           type: string
 *                           example: "room_1744394970056"
 *                         iceCandidates:
 *                           type: array
 *                           items:
 *                             type: object
 *                           example: []
 *                         messages:
 *                           type: array
 *                           items:
 *                             type: object
 *                           example: []
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-04-11T18:09:30.058Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-04-11T18:09:30.058Z"
 *                         __v:
 *                           type: integer
 *                           example: 0
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: User added to waiting queue.
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
 *                   example: "Waiting for a match"
 *       400:
 *         description: Bad request, User ID is required.
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
 *                   example: "User ID is required"
 */

router.post('/create-room', createRoom);
/**
 * @swagger
 * /api/v1/next-chat:
 *   post:
 *     summary: Skip current match and find a new one
 *     description: Removes the user from the current session and searches for a new match.
 *     tags: [WebRTC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *     responses:
 *       200:
 *         description: Searching for a new match...
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
 *                   example: "Searching for a new match..."
 *       400:
 *         description: Bad request, User ID is required.
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
 *                   example: "User ID is required"
 */
router.post('/next-chat', nextChat);

export default router;
