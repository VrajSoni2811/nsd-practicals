import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['Admin', 'Author', 'Reader'],
      default: 'Reader'
    },
    bio: {
      type: String,
      default: 'Community member and technical reader.'
    }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
