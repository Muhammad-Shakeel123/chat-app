import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Session } from '../models/session.model.js'; // Assuming you have a Session model
const createRoom = asyncHandler(async (req, res) => {
  const { user1, user2 } = req.body;

  if (!user1 || !user2) {
    throw new ApiError(400, 'Both user1 and user2 are required');
  }

  // ✅ Check if an active session already exists
  let existingSession = await Session.findOne({
    $or: [
      { user1, user2, sessionType: 'video', status: 'active' },
      { user1: user2, user2: user1, sessionType: 'video', status: 'active' },
    ],
  });

  if (existingSession) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, 'WebRTC session already exists', existingSession),
      );
  }

  // ✅ Generate a Unique Room ID
  const roomId = `room_${Date.now()}`;

  // ✅ Create a new session
  const newSession = await Session.create({
    user1,
    user2,
    sessionType: 'video',
    roomId,
    status: 'active',
    startedAt: new Date(),
  });

  res
    .status(201)
    .json(new ApiResponse(201, 'Room created successfully', newSession));
});

const sendOffer = asyncHandler(async (req, res) => {
  const { roomId, offer } = req.body;

  if (!roomId || !offer) {
    throw new ApiError(400, 'roomId and offer are required');
  }

  let session = await Session.findOne({ roomId });

  if (!session) {
    session = await Session.create({ roomId, offer });
  } else {
    session.offer = offer;
    await session.save();
  }

  res
    .status(200)
    .json(new ApiResponse(200, 'Offer stored successfully', { offer }));
});

const getOffer = asyncHandler(async (req, res) => {
  const { roomId } = req.params;

  const session = await Session.findOne({ roomId });

  if (!session || !session.offer) {
    throw new ApiError(404, 'No offer found for this room');
  }

  res
    .status(200)
    .json(new ApiResponse(200, 'Offer retrieved', { offer: session.offer }));
});

const sendAnswer = asyncHandler(async (req, res) => {
  const { roomId, answer } = req.body;

  if (!roomId || !answer) {
    throw new ApiError(400, 'roomId and answer are required');
  }

  // ✅ Update the session document in MongoDB
  const session = await Session.findOneAndUpdate(
    { roomId },
    { answer }, // Update answer field
    { new: true, runValidators: true }, // Return updated document
  );

  if (!session) {
    throw new ApiError(404, 'Session not found');
  }

  res
    .status(200)
    .json(new ApiResponse(200, 'Answer stored successfully', { answer }));
});

const getAnswer = asyncHandler(async (req, res) => {
  const { roomId } = req.params;

  // ✅ Retrieve answer from MongoDB
  const session = await Session.findOne({ roomId });

  if (!session || !session.answer) {
    throw new ApiError(404, 'No answer found for this room');
  }

  res
    .status(200)
    .json(new ApiResponse(200, 'Answer retrieved', { answer: session.answer }));
});

const sendIceCandidate = asyncHandler(async (req, res) => {
  const { roomId, candidate, sdpMid, sdpMLineIndex } = req.body;

  if (
    !roomId ||
    !candidate ||
    sdpMid === undefined ||
    sdpMLineIndex === undefined
  ) {
    throw new ApiError(
      400,
      'roomId, candidate, sdpMid, and sdpMLineIndex are required',
    );
  }

  // ✅ Find session in MongoDB
  const session = await Session.findOne({ roomId });

  if (!session) {
    throw new ApiError(404, 'Session not found');
  }

  // ✅ Add candidate to session's iceCandidates array
  session.iceCandidates.push({ candidate, sdpMid, sdpMLineIndex });
  await session.save(); // Save updated session

  res
    .status(200)
    .json(new ApiResponse(200, 'Candidate stored successfully', { candidate }));
});

const getIceCandidates = asyncHandler(async (req, res) => {
  const { roomId } = req.params;

  // ✅ Find session in MongoDB
  const session = await Session.findOne({ roomId });

  if (!session) {
    throw new ApiError(404, 'Session not found');
  }

  if (!session.iceCandidates || session.iceCandidates.length === 0) {
    throw new ApiError(404, 'No candidates found for this room');
  }

  res.status(200).json(
    new ApiResponse(200, 'Candidates retrieved', {
      candidates: session.iceCandidates,
    }),
  );
});

export {
  createRoom,
  sendOffer,
  getOffer,
  sendAnswer,
  getAnswer,
  sendIceCandidate,
  getIceCandidates,
};
