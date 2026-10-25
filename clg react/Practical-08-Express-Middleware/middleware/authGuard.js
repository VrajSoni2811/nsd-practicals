/**
 * Router-Level Middleware: API Key Authentication Guard
 * Inspects request headers for valid x-api-key
 */
const VALID_API_KEY = 'secret-token-2026';

export const authGuard = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;

  if (req.trace) {
    req.trace.push({
      middleware: 'AuthGuard',
      detail: `Verifying API Key: ${apiKey ? `Provided (${apiKey})` : 'Missing'}`
    });
  }

  if (!apiKey) {
    const error = new Error('HTTP 401 Unauthorized: Missing x-api-key header.');
    error.status = 401;
    return next(error);
  }

  if (apiKey !== VALID_API_KEY) {
    const error = new Error('HTTP 403 Forbidden: Invalid API Key provided.');
    error.status = 403;
    return next(error);
  }

  // Attach authenticated identity to req
  req.user = {
    role: 'Administrator',
    keyType: 'FullAccessKey',
    issuedTo: 'Lab-Examiner'
  };

  next();
};
