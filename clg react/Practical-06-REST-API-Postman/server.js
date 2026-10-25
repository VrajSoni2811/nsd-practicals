import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import studentRoutes from './routes/studentRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// 1. Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Custom Request Logger
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] 📮 ${req.method} ${req.url}`);
  next();
});

// 3. Serve Static Frontend & Postman collection assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/postman', express.static(path.join(__dirname, 'postman')));

// 4. RESTful API Routes
app.use('/api/students', studentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    service: 'Practical 06 Student REST API & Postman Suite',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// 5. 404 handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource "${req.originalUrl}" not found.`
  });
});

// 6. Global Error Handling
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error.',
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Practical 06 Server running on: http://localhost:${PORT}`);
  console.log(`📮 Postman Suite & Dashboard:      http://localhost:${PORT}`);
  console.log(`🎓 Student REST Resource:          http://localhost:${PORT}/api/students`);
  console.log(`=======================================================`);
});
