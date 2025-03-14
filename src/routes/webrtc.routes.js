import express from 'express';
import {
  createRoom,
  sendOffer,
  getOffer,
  sendAnswer,
  getAnswer,
  sendIceCandidate,
  getIceCandidates,
} from '../controllers/webrtc.controller.js';

const router = express.Router();

// ✅ Define WebRTC Routes
/**
 * @swagger
 * /api/v1/webrtc/create-room:
 *   post:
 *     summary: Create or retrieve a WebRTC room
 *     description: Checks if an active WebRTC session exists between two users. If not, it creates a new session.
 *     tags:
 *       - WebRTC
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user1
 *               - user2
 *             properties:
 *               user1:
 *                 type: string
 *                 example: "67d1e717b6c31ad8a45614af"
 *                 description: Unique ID of the first user.
 *               user2:
 *                 type: string
 *                 example: "67d1e6e1b6c31ad8a45614a8"
 *                 description: Unique ID of the second user.
 *     responses:
 *       200:
 *         description: WebRTC session already exists between the users.
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
 *                   example: "WebRTC session already exists"
 *                 message:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67d484331fb25116f64097a0"
 *                     user1:
 *                       type: string
 *                       example: "67d1e717b6c31ad8a45614af"
 *                     user2:
 *                       type: string
 *                       example: "67d1e6e1b6c31ad8a45614a8"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     startedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-14T19:32:03.489Z"
 *                     endedAt:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     sessionType:
 *                       type: string
 *                       example: "video"
 *                     roomId:
 *                       type: string
 *                       example: "room_1741980723489"
 *                     messages:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-14T19:32:03.492Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-14T19:32:03.492Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 success:
 *                   type: boolean
 *                   example: true
 *       201:
 *         description: Successfully created a new WebRTC room.
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
 *                   example: "Room created successfully"
 *                 message:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67d484331fb25116f64097a1"
 *                     user1:
 *                       type: string
 *                       example: "67d1e717b6c31ad8a45614af"
 *                     user2:
 *                       type: string
 *                       example: "67d1e6e1b6c31ad8a45614a8"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     startedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-14T19:35:00.123Z"
 *                     endedAt:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     sessionType:
 *                       type: string
 *                       example: "video"
 *                     roomId:
 *                       type: string
 *                       example: "room_1741980725123"
 *                     messages:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: []
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-14T19:35:00.125Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-14T19:35:00.125Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Validation error - Missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: "Both user1 and user2 are required"
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
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/create-room', createRoom);

/**
 * @swagger
 * /api/v1/webrtc/offer:
 *   post:
 *     summary: Store or update a WebRTC offer
 *     description: Saves the WebRTC offer for a given room. If the room exists, it updates the offer; otherwise, it creates a new session with the offer.
 *     tags:
 *       - WebRTC
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - offer
 *             properties:
 *               roomId:
 *                 type: string
 *                 example: "room_1741980723489"
 *                 description: Unique identifier for the WebRTC room.
 *               offer:
 *                 type: string
 *                 example: "abc"
 *                 description: WebRTC offer to be stored.
 *     responses:
 *       200:
 *         description: Offer stored or updated successfully.
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
 *                   example: "Offer stored successfully"
 *                 message:
 *                   type: object
 *                   properties:
 *                     offer:
 *                       type: string
 *                       example: "abc"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Validation error - Missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: "roomId and offer are required"
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
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/offer', sendOffer);

/**
 * @swagger
 * /api/v1/webrtc/offer/{roomId}:
 *   get:
 *     summary: Retrieve the WebRTC offer for a room
 *     description: Fetches the stored WebRTC offer associated with a given room ID.
 *     tags:
 *       - WebRTC
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         example: "room_1741980723489"
 *         description: Unique identifier for the WebRTC room.
 *     responses:
 *       200:
 *         description: Successfully retrieved the offer.
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
 *                   example: "Offer retrieved"
 *                 message:
 *                   type: object
 *                   properties:
 *                     offer:
 *                       type: string
 *                       example: "abc"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: No offer found for the specified room ID.
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
 *                   example: "No offer found for this room"
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
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/offer/:roomId', getOffer);

/**
 * @swagger
 * /api/v1/webrtc/answer:
 *   post:
 *     summary: Store WebRTC answer for a room
 *     description: Saves the WebRTC answer in the database for a given room ID.
 *     tags:
 *       - WebRTC
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *                 example: "room_1741980723489"
 *                 description: Unique identifier for the WebRTC room.
 *               answer:
 *                 type: string
 *                 example: "how are you"
 *                 description: The WebRTC answer.
 *     responses:
 *       200:
 *         description: Successfully stored the answer.
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
 *                   example: "Answer stored successfully"
 *                 message:
 *                   type: object
 *                   properties:
 *                     answer:
 *                       type: string
 *                       example: "how are you"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing required fields (roomId or answer).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: "roomId and answer are required"
 *       404:
 *         description: Room session not found.
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
 *                   example: "Session not found"
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
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/answer', sendAnswer);

/**
 * @swagger
 * /api/v1/webrtc/getanswer/{roomId}:
 *   get:
 *     summary: Retrieve WebRTC answer for a room
 *     description: Fetches the stored WebRTC answer from the database for a given room ID.
 *     tags:
 *       - WebRTC
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *           example: "room_1741980723489"
 *         description: Unique identifier for the WebRTC room.
 *     responses:
 *       200:
 *         description: Successfully retrieved the answer.
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
 *                   example: "Answer retrieved"
 *                 message:
 *                   type: object
 *                   properties:
 *                     answer:
 *                       type: string
 *                       example: "how are you"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: No answer found for the specified room ID.
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
 *                   example: "No answer found for this room"
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
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/getanswer/:roomId', getAnswer);

/**
 * @swagger
 * /api/v1/webrtc/ice-candidate:
 *   post:
 *     summary: Store ICE Candidate for WebRTC session
 *     description: Saves an ICE candidate for a given WebRTC session in the database.
 *     tags:
 *       - WebRTC
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *                 example: "room_1741980723489"
 *               candidate:
 *                 type: string
 *                 example: "candidate data"
 *               sdpMid:
 *                 type: string
 *                 example: "0"
 *               sdpMLineIndex:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       200:
 *         description: ICE candidate stored successfully.
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
 *                   example: "Candidate stored successfully"
 *                 message:
 *                   type: object
 *                   properties:
 *                     candidate:
 *                       type: string
 *                       example: "candidate data"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing required fields in the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: "roomId, candidate, sdpMid, and sdpMLineIndex are required"
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
 *                 error:
 *                   type: string
 *                   example: "Session not found"
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
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/ice-candidate', sendIceCandidate);

/**
 * @swagger
 * /api/v1/webrtc/ice-candidate-get/{roomId}:
 *   get:
 *     summary: Retrieve ICE Candidates for a WebRTC session
 *     description: Fetches all stored ICE candidates for a given WebRTC session.
 *     tags:
 *       - WebRTC
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         example: "room_1741980723489"
 *         description: The unique identifier of the WebRTC session.
 *     responses:
 *       200:
 *         description: ICE candidates retrieved successfully.
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
 *                   example: "Candidates retrieved"
 *                 message:
 *                   type: object
 *                   properties:
 *                     candidates:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           candidate:
 *                             type: string
 *                             example: "candidate data"
 *                           sdpMid:
 *                             type: string
 *                             example: "0"
 *                           sdpMLineIndex:
 *                             type: integer
 *                             example: 0
 *                           _id:
 *                             type: string
 *                             example: "67d4930afda1fbfc684eb003"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: No ICE candidates found or session does not exist.
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
 *                   example: "No candidates found for this room"
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
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/ice-candidate-get/:roomId', getIceCandidates);

export default router;
