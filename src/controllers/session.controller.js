import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Session } from '../models/session.model.js';

const createSession = asyncHandler(async (req, res) => {
  const { user1, user2, sessionType } = req.body; // sessionType: 'video' or 'chat'

  if (!sessionType) {
    return res
      .status(400)
      .json(new ApiResponse(400, 'Session type is required'));
  }

  // Check if an active session already exists
  const existingSession = await Session.findOne({
    $or: [
      { user1, user2, sessionType },
      { user1: user2, user2: user1, sessionType },
    ],
    status: 'active',
  });

  if (existingSession) {
    return res
      .status(200)
      .json(new ApiResponse(200, 'Session already exists', existingSession));
  }

  // Generate a unique room ID for video chat
  const roomId = sessionType === 'video' ? `room_${Date.now()}` : null;

  // Create a new session
  const newSession = await Session.create({
    user1,
    user2,
    sessionType,
    roomId, // Only for video calls
    status: 'active',
    startedAt: new Date(),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, 'Session created successfully', newSession));
});


const getSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const session = await Session.findById(sessionId).populate(
    'user1 user2',
    'username',
  );
  if (!session) throw new ApiError(404, 'Session not found');

  return res
    .status(200)
    .json(new ApiResponse(200, 'Session retrieved successfully', session));
});

const endSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  const session = await Session.findByIdAndUpdate(
    sessionId,
    {
      status: 'ended',
      endedAt: new Date(),
    },
    { new: true },
  );

  if (!session) throw new ApiError(404, 'Session not found');

  return res
    .status(200)
    .json(new ApiResponse(200, 'Session ended successfully', session));
});

export { createSession, getSession, endSession };
