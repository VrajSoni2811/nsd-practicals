import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnectedToAtlas = false;
let connectionMessage = 'Connecting...';

// High-Fidelity Local Fallback Database
export let inMemoryProjects = [
  {
    _id: '671dd0000000000000000001',
    title: 'Enterprise ERP Cloud Migration',
    description: 'Transition monolithic ERP infrastructure to distributed microservices on AWS.',
    category: 'Backend',
    status: 'In-Progress',
    priority: 'Critical',
    lead: 'Aditya Sen',
    budget: 1850000,
    completionPercentage: 65,
    dueDate: new Date('2026-12-15'),
    createdAt: new Date('2026-09-01'),
    updatedAt: new Date()
  },
  {
    _id: '671dd0000000000000000002',
    title: 'Design System & Component Library',
    description: 'Unify company design language into reusable React 19 micro-components with vanilla CSS.',
    category: 'Frontend',
    status: 'Review',
    priority: 'High',
    lead: 'Ananya Sharma',
    budget: 720000,
    completionPercentage: 90,
    dueDate: new Date('2026-11-10'),
    createdAt: new Date('2026-09-15'),
    updatedAt: new Date()
  },
  {
    _id: '671dd0000000000000000003',
    title: 'AI Predictive Inventory Forecaster',
    description: 'Train XGBoost model to optimize warehouse restocking thresholds and supply chains.',
    category: 'AI/ML',
    status: 'Backlog',
    priority: 'Medium',
    lead: 'Dr. Vikram Seth',
    budget: 1200000,
    completionPercentage: 20,
    dueDate: new Date('2027-01-20'),
    createdAt: new Date('2026-10-01'),
    updatedAt: new Date()
  },
  {
    _id: '671dd0000000000000000004',
    title: 'Cross-Platform Student Mobile Portal',
    description: 'Real-time grade book, attendance tracker, and fee clearance portal for campus students.',
    category: 'Mobile',
    status: 'Completed',
    priority: 'High',
    lead: 'Pooja Hegde',
    budget: 950000,
    completionPercentage: 100,
    dueDate: new Date('2026-10-20'),
    createdAt: new Date('2026-08-10'),
    updatedAt: new Date()
  }
];

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('example.mongodb.net')) {
    isConnectedToAtlas = false;
    connectionMessage = 'Operating in Standalone Simulated Mode (Atlas URI not configured or offline). Full MERN CRUD active.';
    console.log(`ℹ️ [Database] ${connectionMessage}`);
    return;
  }

  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    isConnectedToAtlas = true;
    connectionMessage = `Connected to MongoDB Atlas Cluster: ${conn.connection.host}`;
    console.log(`✅ [MongoDB Atlas] ${connectionMessage}`);
  } catch (error) {
    isConnectedToAtlas = false;
    connectionMessage = `Atlas Cluster Unreachable (${error.message}). Switched to High-Fidelity Local Fallback Mode.`;
    console.warn(`⚠️ [MongoDB Atlas] ${connectionMessage}`);
  }
};

export const getDBStatus = () => ({
  isAtlas: isConnectedToAtlas,
  message: connectionMessage,
  mode: isConnectedToAtlas ? 'MongoDB Atlas Cloud' : 'High-Fidelity Simulated Mongo Engine'
});
