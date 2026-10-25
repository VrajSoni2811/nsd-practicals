/**
 * Centralized Error-Handling Middleware
 * Express recognizes error handlers specifically by four arguments: (err, req, res, next)
 */
export const centralizedErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  if (req.trace) {
    req.trace.push({
      middleware: 'CentralizedErrorHandler',
      detail: `Caught ${err.name || 'Error'}: [HTTP ${statusCode}] ${err.message}`
    });
  }

  console.error(`🚨 [Centralized Error Handler] [HTTP ${statusCode}] ${err.message}`);

  res.status(statusCode).json({
    success: false,
    error: {
      status: statusCode,
      message: err.message,
      details: err.details || null,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    },
    middlewareLifecycleTrace: req.trace || []
  });
};
