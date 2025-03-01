import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Session } from '../models/session.model.js';
import { getSocketInstance } from '../utils/socketUtils.js';
const sendMessage = asyncHandler(async (req, res) => {
  const { sessionId, content } = req.body;

  if (!content.trim()) {
    throw new ApiError(400, 'Message content cannot be empty');
  }

  const session = await Session.findById(sessionId);
  if (!session) throw new ApiError(404, 'Session not found');

  const message = {
    sender: req.user._id,
    content,
    timestamp: new Date(),
  };

  session.messages.push(message);
  await session.save();

  // ✅ Emit message to socket clients
  try {
    const io = getSocketInstance();
    io.to(sessionId).emit('newMessage', message);
  } catch (error) {
    console.error('Socket.io instance error:', error.message);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, 'Message sent successfully', message));
});

const getMessages = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  const session = await Session.findById(sessionId).populate({
    path: 'messages.sender',
    select: 'username _id', // ✅ Only populate necessary fields
  });

  if (!session) throw new ApiError(404, 'Session not found');

  const formattedMessages = session.messages.map(msg => ({
    _id: msg._id,
    sender: {
      _id: msg.sender._id,
      username: msg.sender.username, // ✅ Ensure only this is populated
    },
    content: msg.content,
    timestamp: msg.timestamp,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        'Messages retrieved successfully',
        formattedMessages,
      ),
    );
});

const deleteMessage = asyncHandler(async (req, res) => {
  const { sessionId, messageId } = req.params;

  const session = await Session.findById(sessionId);
  if (!session) throw new ApiError(404, 'Session not found');

  // ✅ Store initial messages count
  const initialLength = session.messages.length;

  // ✅ Filter out the message
  session.messages = session.messages.filter(msg => msg._id != messageId); // Simple comparison

  // ✅ Check if the message was actually deleted
  if (session.messages.length === initialLength) {
    throw new ApiError(404, 'Message not found');
  }

  await session.save(); // ✅ Save the updated session

  return res
    .status(200)
    .json(new ApiResponse(200, 'Message deleted successfully'));
});




export { sendMessage, getMessages, deleteMessage };
