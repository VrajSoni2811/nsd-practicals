/**
 * Custom Rate Limiting Middleware
 * Enforces sliding window limits per IP (e.g. max 15 requests per 10 seconds)
 */
const ipHitMap = new Map();
const WINDOW_MS = 10000; // 10 seconds window
const MAX_REQUESTS = 12; // 12 requests allowed

export const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();

  if (!ipHitMap.has(ip)) {
    ipHitMap.set(ip, []);
  }

  // Filter timestamps within the current sliding window
  const timestamps = ipHitMap.get(ip).filter((time) => now - time < WINDOW_MS);
  timestamps.push(now);
  ipHitMap.set(ip, timestamps);

  const remaining = Math.max(0, MAX_REQUESTS - timestamps.length);

  // Set standard rate limiting HTTP headers
  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
  res.setHeader('X-RateLimit-Remaining', remaining);
  res.setHeader('X-RateLimit-Reset', Math.ceil((now + WINDOW_MS) / 1000));

  if (req.trace) {
    req.trace.push({
      middleware: 'RateLimiter',
      detail: `Current IP hits: ${timestamps.length}/${MAX_REQUESTS} (Remaining: ${remaining})`
    });
  }

  if (timestamps.length > MAX_REQUESTS) {
    const error = new Error('HTTP 429: Too Many Requests. Rate limit quota exceeded.');
    error.status = 429;
    error.retryAfter = Math.ceil(WINDOW_MS / 1000);
    return next(error);
  }

  next();
};

export const resetRateLimits = () => {
  ipHitMap.clear();
};
