import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

import { connectDB, getDBStatus } from './config/db.js';
import { UPLOADS_DIR } from './config/multerConfig.js';
import fileRoutes from './routes/fileRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Dashboard Frontend
app.use(express.static(path.join(__dirname, 'public')));

// Serve Uploaded Files Statically for Live In-Browser Previews
app.use('/uploads', express.static(UPLOADS_DIR));

// Database Initialisation
connectDB();

// File Management API Routes
app.use('/api/files', fileRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    practical: 'Practical 09: Multer File Upload & MongoDB Storage',
    database: getDBStatus(),
    timestamp: new Date().toISOString()
  });
});

// Multer & General Error Handling Middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File upload error: File size exceeds the maximum permitted limit of 5 MB.'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'File upload error: Maximum of 5 files can be uploaded simultaneously.'
      });
    }
    return res.status(400).json({ success: false, message: `Multer Error: ${err.message}` });
  }

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Practical 09 Server Running on: http://localhost:${PORT}`);
  console.log(`📁 File Manager Dashboard: http://localhost:${PORT}`);
  console.log(`📡 File Upload API: http://localhost:${PORT}/api/files/upload`);
  console.log(`=======================================================`);
});
