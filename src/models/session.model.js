import mongoose, { Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: { type: String, enum: ['active', 'ended'], default: 'active' },
    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date, default: null },
    sessionType: { type: String, enum: ['text', 'video'], default: 'video' },
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

export const Session = mongoose.model('Session', sessionSchema);
