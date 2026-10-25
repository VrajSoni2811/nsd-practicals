import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters']
    },
    description: {
      type: String,
      trim: true,
      default: 'No description provided.'
    },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'FullStack', 'AI/ML', 'Mobile', 'DevOps'],
      default: 'FullStack'
    },
    status: {
      type: String,
      enum: ['Backlog', 'In-Progress', 'Review', 'Completed'],
      default: 'In-Progress'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium'
    },
    lead: {
      type: String,
      required: [true, 'Project lead name is required'],
      trim: true
    },
    budget: {
      type: Number,
      required: true,
      min: [1000, 'Minimum budget is 1,000']
    },
    completionPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    dueDate: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days ahead
    }
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
