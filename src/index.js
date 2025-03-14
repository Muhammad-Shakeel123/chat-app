import dotenv from 'dotenv';
import http from 'http';
import connectDB from './db/index.js';
import { app } from './app.js';
import { Server } from 'socket.io';
import { setSocketInstance } from './utils/socketUtils.js';

dotenv.config({ path: './env' });

// ✅ Create HTTP Server for Express
const server = http.createServer(app);

// ✅ Initialize Socket.IO
const io = new Server(server, {
  cors: { origin: '*' }, // Allow all origins (adjust for production)
});

// ✅ Store socket instance globally
setSocketInstance(io);

// ✅ Track connected users
const activeUsers = new Map(); // userId -> socketId

// ✅ WebRTC Signaling Logic
io.on('connection', socket => {
  console.log(`⚡ User connected: ${socket.id}`);

  // ✅ When a user joins a room
  socket.on('join-room', ({ roomId, userId }) => {
    if (!roomId || !userId) return; // Prevent invalid data
    socket.join(roomId);
    activeUsers.set(userId, socket.id);
    console.log(`👥 User ${userId} joined room: ${roomId}`);
  });

  // ✅ Handle WebRTC Offer
  socket.on('offer', ({ roomId, offer }) => {
    if (!roomId || !offer) return;
    socket.to(roomId).emit('offer', { offer });
  });

  // ✅ Handle WebRTC Answer
  socket.on('answer', ({ roomId, answer }) => {
    if (!roomId || !answer) return;
    socket.to(roomId).emit('answer', { answer });
  });

  // ✅ Handle ICE Candidate Exchange
  socket.on('ice-candidate', ({ roomId, candidate }) => {
    if (!roomId || !candidate) return;
    socket.to(roomId).emit('ice-candidate', { candidate });
  });

  // ✅ Handle user disconnection
  socket.on('disconnect', () => {
    const userId = [...activeUsers.entries()].find(
      ([key, value]) => value === socket.id,
    )?.[0];
    if (userId) activeUsers.delete(userId);
    console.log(`❌ User ${userId} disconnected`);
  });
});

// ✅ Connect to Database and Start Server
connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log('❌ MONGO DB connection failed:', err);
  });
