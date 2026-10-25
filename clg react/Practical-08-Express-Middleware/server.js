import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { requestLogger } from './middleware/logger.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { centralizedErrorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/apiRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5003;

// 1. Third-party CORS middleware
app.use(cors());

// 2. Built-in Static Asset Hosting
app.use(express.static(path.join(__dirname, 'public')));

// 3. Built-in Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Application-Level Middleware: Logging & Lifecycle Tracer
app.use(requestLogger);

// 5. Utility Middleware: Sliding-Window Rate Limiter
app.use(rateLimiter);

// 6. Router-Level Middleware Mounting
app.use('/api', apiRoutes);

// 7. 404 Not Found Middleware (passes error to centralized error handler)
app.use((req, res, next) => {
  const error = new Error(`Resource '${req.originalUrl}' does not exist on this server.`);
  error.status = 404;
  next(error);
});

// 8. Centralized Error-Handling Middleware (Must be last)
app.use(centralizedErrorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Practical 08 Server Running on: http://localhost:${PORT}`);
  console.log(`🧪 Interactive Middleware Visualizer: http://localhost:${PORT}`);
  console.log(`📡 API Endpoints: http://localhost:${PORT}/api/public/status`);
  console.log(`=======================================================`);
});
