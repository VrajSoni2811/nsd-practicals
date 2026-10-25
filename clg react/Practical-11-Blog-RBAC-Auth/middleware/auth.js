import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'jwt-college-secret-key-practical-11-2026';

/**
 * Authentication Middleware: Verify JWT Bearer Token
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: Missing or malformed Bearer Token in Authorization header.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, name, email, role }
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Authentication Error: JWT Token has expired.' });
    }
    return res.status(403).json({ success: false, message: 'Forbidden: Invalid JWT Token signature.' });
  }
};
