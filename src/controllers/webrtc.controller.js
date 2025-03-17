import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiErrors.js';
import { Session } from '../models/session.model.js';

const waitingUsers = []; // Queue of users waiting for a match

// ✅ Match Users Randomly or Add to Waiting Queue
const createRoom = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json(new ApiError(400, 'User ID is required'));
  }

  // Check if there's a user already waiting
  if (waitingUsers.length > 0) {
    const matchedUser = waitingUsers.shift(); // Get first waiting user
    const roomId = `room_${Date.now()}`; // ✅ Fixed Room ID Generation

    // ✅ Create a new session
    const newSession = await Session.create({
      user1: matchedUser,
      user2: userId,
      sessionType: 'video',
      roomId,
      status: 'active',
      startedAt: new Date(),
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, 'Matched successfully', { roomId, newSession }),
      );
  }

  // No available users, add this user to queue (Prevent Duplicates)
  if (!waitingUsers.includes(userId)) {
    waitingUsers.push(userId);
  }

  res.status(200).json(new ApiResponse(200, 'Waiting for a match'));
});

// ✅ Handle "Next" Button - Skip Current Match & Find a New One
const nextChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json(new ApiError(400, 'User ID is required'));
  }

  // Remove user from any active session
  await Session.deleteMany({ $or: [{ user1: userId }, { user2: userId }] });

  // Add user back to the waiting queue if not already in it
  if (!waitingUsers.includes(userId)) {
    waitingUsers.push(userId);
  }

  res.status(200).json(new ApiResponse(200, 'Searching for a new match...'));
});

// ✅ Handle User Disconnection - Remove from Queue
const disconnectUser = userId => {
  const index = waitingUsers.indexOf(userId);
  if (index !== -1) waitingUsers.splice(index, 1);
};

export { createRoom, nextChat, disconnectUser };
