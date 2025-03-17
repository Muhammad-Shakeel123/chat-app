import mongoose, { Schema } from 'mongoose';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    country: { type: String, required: true },
    status: {
      type: String,
      enum: ['available', 'on-call', 'offline'],
      default: 'available',
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String, default: '' },
    refreshToken: { type: String },
    lastActive: { type: Date, default: null },
  },
  { timestamps: true },
);

// 🔹 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔹 Compare passwords
userSchema.methods.isPasswordCorrect = async function (providedPassword) {
  return await bcrypt.compare(providedPassword, this.password);
};

// 🔹 Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return JWT.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};

// 🔹 Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return JWT.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const User = mongoose.model('User', userSchema);
