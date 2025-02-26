import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public')); // ✅ Serves static files from 'public' folder
app.use(cookieParser());

// Routes imports
import authRoutes from './routes/auth.routes.js';
import userRoutes from "./routes/user.routes.js"

// Routes declaration
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/user", userRoutes)

// ✅ Serve the HTML page for API documentation
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'index.html'));
});

export { app };
