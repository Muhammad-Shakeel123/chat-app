import dotenv from 'dotenv';
import http from 'http';
import connectDB from './db/index.js';
import { app } from './app.js';
import { Server } from 'socket.io';
import { setSocketInstance } from './utils/socketUtils.js';

dotenv.config({ path: './.env' });

// ✅ Create HTTP Server for Express
const server = http.createServer(app);

// ✅ Initialize Socket.io
const io = new Server(server, {
  cors: { origin: '*' }, // Allow all origins (change this for production)
});

// ✅ Store socket instance globally
setSocketInstance(io);

// ✅ Handle Socket.io Events
io.on('connection', socket => {
  console.log(`⚡ User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
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
