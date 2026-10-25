import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true
    },
    excerpt: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['Architecture', 'React', 'NodeJS', 'Database', 'Security', 'DevOps'],
      default: 'Architecture'
    },
    authorId: {
      type: String,
      required: true
    },
    authorName: {
      type: String,
      required: true
    },
    authorRole: {
      type: String,
      default: 'Author'
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Published'
    },
    readTimeMinutes: {
      type: Number,
      default: 4
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: [
      {
        userName: String,
        userRole: String,
        commentText: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export const Article = mongoose.model('Article', articleSchema);
