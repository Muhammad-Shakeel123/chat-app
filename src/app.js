import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
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
