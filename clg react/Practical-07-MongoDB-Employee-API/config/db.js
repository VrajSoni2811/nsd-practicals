import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnectedToAtlas = false;
let connectionMessage = 'Connecting...';

// In-Memory Fallback Store (Ensures offline college labs work seamlessly)
export let inMemoryEmployees = [
  {
    _id: '671ba1110000000000000001',
    empId: 'EMP-101',
    name: 'Siddharth Roy',
    email: 'siddharth.roy@corp.io',
    department: 'Engineering',
    designation: 'Senior Lead Architect',
    salary: 135000,
    status: 'Active',
    joiningDate: new Date('2022-03-01'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '671ba1110000000000000002',
    empId: 'EMP-102',
    name: 'Meera Nambiar',
    email: 'meera.n@corp.io',
    department: 'Product',
    designation: 'Principal Product Manager',
    salary: 125000,
    status: 'Active',
    joiningDate: new Date('2022-07-15'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '671ba1110000000000000003',
    empId: 'EMP-103',
    name: 'Kabir Singhania',
    email: 'kabir.s@corp.io',
    department: 'Engineering',
    designation: 'Full Stack MERN Developer',
    salary: 95000,
    status: 'Active',
    joiningDate: new Date('2023-01-10'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '671ba1110000000000000004',
    empId: 'EMP-104',
    name: 'Zara Alvi',
    email: 'zara.alvi@corp.io',
    department: 'Design',
    designation: 'Staff UX/UI Specialist',
    salary: 88000,
    status: 'Active',
    joiningDate: new Date('2023-05-20'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '671ba1110000000000000005',
    empId: 'EMP-105',
    name: 'Arjun Dasgupta',
    email: 'arjun.d@corp.io',
    department: 'Finance',
    designation: 'Financial Controller',
    salary: 105000,
    status: 'On Leave',
    joiningDate: new Date('2021-11-05'),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('example.mongodb.net')) {
    isConnectedToAtlas = false;
    connectionMessage = 'Operating in Standalone Simulated Mode (Atlas URI not configured or offline). Full CRUD is active.';
    console.log(`ℹ️ [Database] ${connectionMessage}`);
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000
    });
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
