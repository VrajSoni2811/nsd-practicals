import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnectedToAtlas = false;
let connectionMessage = 'Connecting...';

// In-Memory Fallback File Storage
export let inMemoryFiles = [
  {
    _id: '671cb0000000000000000001',
    originalName: 'React_Hooks_Cheatsheet.pdf',
    filename: 'sample-react-hooks.pdf',
    path: 'uploads/sample-react-hooks.pdf',
    mimetype: 'application/pdf',
    size: 245760, // 240 KB
    formattedSize: '240.0 KB',
    category: 'Document',
    description: 'Comprehensive quick-reference guide for React 19 hooks and lifecycle patterns.',
    uploader: 'Faculty Admin',
    createdAt: new Date(Date.now() - 86400000 * 2),
    updatedAt: new Date()
  },
  {
    _id: '671cb0000000000000000002',
    originalName: 'System_Architecture_Diagram.png',
    filename: 'sample-arch-diagram.png',
    path: 'uploads/sample-arch-diagram.png',
    mimetype: 'image/png',
    size: 524288, // 512 KB
    formattedSize: '512.0 KB',
    category: 'Image',
    description: 'High-level diagram illustrating Multer disk storage and MongoDB metadata linking.',
    uploader: 'Lab Student',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date()
  }
];

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('example.mongodb.net')) {
    isConnectedToAtlas = false;
    connectionMessage = 'Operating in Standalone Simulated Mode (Atlas URI not configured or offline). Full upload & metadata CRUD active.';
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
