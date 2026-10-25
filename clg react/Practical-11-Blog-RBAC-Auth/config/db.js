import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnectedToAtlas = false;
let connectionMessage = 'Connecting...';

// Pre-seeded Users with Roles
export const inMemoryUsers = [
  {
    _id: 'usr_admin_001',
    name: 'Devraj Mukherjee (Admin)',
    email: 'admin@blog.io',
    password: 'password123',
    role: 'Admin',
    bio: 'Platform System Administrator with global modification rights.'
  },
  {
    _id: 'usr_author_002',
    name: 'Sneha Kulkarni (Author)',
    email: 'author@blog.io',
    password: 'password123',
    role: 'Author',
    bio: 'Senior Technical Writer specializing in React & Cloud Patterns.'
  },
  {
    _id: 'usr_reader_003',
    name: 'Tanmay Bhatt (Reader)',
    email: 'reader@blog.io',
    password: 'password123',
    role: 'Reader',
    bio: 'Engineering student exploring distributed systems and web design.'
  }
];

// Pre-seeded Articles
export let inMemoryArticles = [
  {
    _id: 'art_101',
    title: 'Modern Micro-Frontend Architecture with Module Federation',
    excerpt: 'How enterprise teams decouple monolithic React codebases into independent feature teams.',
    content: 'Micro-frontends extend microservices paradigms to client applications. By leveraging Webpack 5 Module Federation, teams can independently develop, test, and deploy disparate slices of the user interface without requiring full-application rebuilds...',
    category: 'Architecture',
    authorId: 'usr_author_002',
    authorName: 'Sneha Kulkarni (Author)',
    authorRole: 'Author',
    status: 'Published',
    readTimeMinutes: 5,
    likes: 42,
    comments: [
      {
        userName: 'Tanmay Bhatt (Reader)',
        userRole: 'Reader',
        commentText: 'Brilliant breakdown of runtime script evaluation vs build-time federation!',
        createdAt: new Date('2026-10-24T10:30:00Z')
      }
    ],
    createdAt: new Date('2026-10-22'),
    updatedAt: new Date()
  },
  {
    _id: 'art_102',
    title: 'Securing REST APIs: JWT Lifecycles & RBAC Enforcement',
    excerpt: 'Comprehensive blueprint for implementing token rotation, role guards, and claim validation.',
    content: 'Role-Based Access Control (RBAC) relies on cryptographic claims embedded in stateless JWT signatures. Inspecting decoded claims inside middleware permits granular enforcement of write and delete privileges across endpoints...',
    category: 'Security',
    authorId: 'usr_admin_001',
    authorName: 'Devraj Mukherjee (Admin)',
    authorRole: 'Admin',
    status: 'Published',
    readTimeMinutes: 7,
    likes: 89,
    comments: [],
    createdAt: new Date('2026-10-20'),
    updatedAt: new Date()
  }
];

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('example.mongodb.net')) {
    isConnectedToAtlas = false;
    connectionMessage = 'Operating in Standalone Simulated Mode (Atlas URI not configured or offline). Full RBAC & Auth active.';
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
