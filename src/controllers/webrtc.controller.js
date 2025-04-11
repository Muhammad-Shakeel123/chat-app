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

  // 🔍 Exclude current user from available users
  const availableUsers = waitingUsers.filter(id => id !== userId);

  if (availableUsers.length > 0) {
    // 🎲 Pick a random user to match
    const randomIndex = Math.floor(Math.random() * availableUsers.length);
    const matchedUser = availableUsers[randomIndex];

    // ❌ Remove the matched user from the waiting list
    waitingUsers.splice(waitingUsers.indexOf(matchedUser), 1);

    const roomId = `room_${Date.now()}`;

    // ✅ Create session
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

  // 😴 No users available, add current user to waiting list if not already
  if (!waitingUsers.includes(userId)) {
    waitingUsers.push(userId);
  }

  return res.status(200).json(new ApiResponse(200, 'Waiting for a match'));
});



// ✅ Handle "Next" Button - Skip Current Match & Find a New One
const nextChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json(new ApiError(400, 'User ID is required'));
  }

  // Remove user from any active session
  await Session.deleteMany({ $or: [{ user1: userId }, { user2: userId }] });

  // Remove user from the waiting list if they exist
  const index = waitingUsers.indexOf(userId);
  if (index !== -1) waitingUsers.splice(index, 1);

  // Add user back to the waiting queue if not already in it
  if (!waitingUsers.includes(userId)) {
    waitingUsers.push(userId);
  }

  res.status(200).json(new ApiResponse(200, 'Searching for a new match...'));
});


// ✅ Handle User Disconnection - Remove from Queue
const disconnectUser = (userId) => {
  const index = waitingUsers.indexOf(userId);
  if (index !== -1) waitingUsers.splice(index, 1);
};


export { createRoom, nextChat, disconnectUser };
