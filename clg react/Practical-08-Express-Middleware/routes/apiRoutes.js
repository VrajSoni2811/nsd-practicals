import express from 'express';
import { authGuard } from '../middleware/authGuard.js';
import { validateTransferPayload } from '../middleware/validator.js';
import { resetRateLimits } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * 1. Public Endpoint
 * Only passes through Logger and Rate Limiter
 */
router.get('/public/status', (req, res) => {
  if (req.trace) {
    req.trace.push({
      middleware: 'RouteHandler (GET /api/public/status)',
      detail: 'Generated public health payload'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Public endpoint accessed successfully.',
    uptime: process.uptime(),
    middlewareLifecycleTrace: req.trace
  });
});

/**
 * 2. Protected Profile
 * Requires authGuard (x-api-key: secret-token-2026)
 */
router.get('/protected/profile', authGuard, (req, res) => {
  if (req.trace) {
    req.trace.push({
      middleware: 'RouteHandler (GET /api/protected/profile)',
      detail: `Authenticated user identity '${req.user.role}' verified`
    });
  }

  res.status(200).json({
    success: true,
    message: 'Protected user profile retrieved.',
    user: req.user,
    account: {
      accountNumber: 'ACC-889922001',
      holderName: 'Aarav Patel',
      balance: 450000,
      currency: 'INR'
    },
    middlewareLifecycleTrace: req.trace
  });
});

/**
 * 3. Protected Transaction with Body Validation
 * Passes through: Logger -> RateLimiter -> BodyParser -> authGuard -> validateTransferPayload -> RouteHandler
 */
router.post('/protected/transfer', authGuard, validateTransferPayload, (req, res) => {
  const { recipient, amount, purpose } = req.body;

  if (req.trace) {
    req.trace.push({
      middleware: 'RouteHandler (POST /api/protected/transfer)',
      detail: `Executed transfer: ₹${amount} to ${recipient}`
    });
  }

  res.status(201).json({
    success: true,
    message: `Transfer of ₹${amount} to ${recipient} completed successfully.`,
    transactionId: `TXN-${Date.now()}`,
    details: { recipient, amount, purpose, timestamp: new Date().toISOString() },
    middlewareLifecycleTrace: req.trace
  });
});

/**
 * 4. Error Simulation Route
 * Explicitly triggers runtime error to verify Centralized Error Handling
 */
router.get('/test/error', (req, res, next) => {
  if (req.trace) {
    req.trace.push({
      middleware: 'RouteHandler (/api/test/error)',
      detail: 'Simulating unexpected database connection crash'
    });
  }

  const err = new Error('Simulated Database I/O Timeout Failure [Runtime Exception]');
  err.status = 503;
  next(err);
});

/**
 * 5. Admin: Reset Rate Limiter
 */
router.post('/admin/reset-limits', (req, res) => {
  resetRateLimits();
  res.status(200).json({
    success: true,
    message: 'Rate limit counters have been reset.'
  });
});

export default router;
