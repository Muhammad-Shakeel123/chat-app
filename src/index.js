import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({ path: './.env' });

// ✅ Connect to Database
await connectDB();

// ✅ Export API for Vercel
export default app;
