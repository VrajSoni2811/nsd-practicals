/**
 * Application-Level Middleware: Request Logger & Lifecycle Tracer
 * Tracks request timing and records every middleware step in req.trace
 */
export const requestLogger = (req, res, next) => {
  const startHr = process.hrtime();
  req.requestTime = new Date().toISOString();
  req.trace = [];

  // Record this middleware execution
  req.trace.push({
    middleware: 'ApplicationLogger',
    time: req.requestTime,
    detail: `${req.method} ${req.originalUrl} received from ${req.ip || '127.0.0.1'}`
  });

  res.on('finish', () => {
    const diff = process.hrtime(startHr);
    const durationMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);
    console.log(
      `[P08-Trace] ${req.method} ${req.originalUrl} -> HTTP ${res.statusCode} (${durationMs}ms)`
    );
  });

  next();
};
