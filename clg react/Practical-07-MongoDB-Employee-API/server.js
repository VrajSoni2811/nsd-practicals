import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, getDBStatus } from './config/db.js';
import employeeRoutes from './routes/employeeRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[P07] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Serve UI dashboard
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB Atlas (with graceful fallback)
connectDB();

// API Routes
app.use('/api/employees', employeeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    practical: 'Practical 07: MongoDB Atlas Employee Management API',
    database: getDBStatus(),
    timestamp: new Date().toISOString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Practical 07 Server Running on: http://localhost:${PORT}`);
  console.log(`📊 Interactive API & Atlas Console: http://localhost:${PORT}`);
  console.log(`📡 REST API Base: http://localhost:${PORT}/api/employees`);
  console.log(`=======================================================`);
});
