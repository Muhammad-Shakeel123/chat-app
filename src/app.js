import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('/favicon.ico', (req, res) => res.status(204).end());
// ✅ Enable CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*', // Allow all origins if not set
    credentials: true,
  }),
);

// ✅ Middleware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Import Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import sessionRoutes from './routes/session.routes.js';
import messageRoutes from './routes/message.routes.js';
import swaggerRoutes from './routes/swagger.routes.js'; // Swagger Routes

// ✅ Use Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/session', sessionRoutes);
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/docs', swaggerRoutes); // Ensure correct Swagger route

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

export { app };
