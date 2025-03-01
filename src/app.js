import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from "./utils/swagger.js";

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

// ✅ Middleware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(swaggerJSDoc());


// ✅ Import Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import sessionRoutes from './routes/session.routes.js';
import messageRoutes from './routes/message.routes.js';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/session', sessionRoutes);
app.use('/api/v1/message', messageRoutes);


app.get('/', (req, res) => {
  res.send('Backend is running...');
});


export { app };
