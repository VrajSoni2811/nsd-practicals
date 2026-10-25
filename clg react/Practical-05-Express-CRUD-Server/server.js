import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/productRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Custom HTTP Request Logger Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] 📡 HTTP ${req.method} ${req.url}`);
  next();
});

// 3. Serve Static Frontend Client Dashboard
app.use(express.static(path.join(__dirname, 'public')));

// 4. API Routes
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    service: 'Practical 05 Express CRUD Server',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 5. 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint "${req.originalUrl}" does not exist on this server.`
  });
});

// 6. Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error occurred.',
    error: err.message
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Express CRUD Server running on: http://localhost:${PORT}`);
  console.log(`📋 Interactive API Dashboard:      http://localhost:${PORT}`);
  console.log(`📦 REST Resource Endpoint:        http://localhost:${PORT}/api/products`);
  console.log(`=======================================================`);
});
