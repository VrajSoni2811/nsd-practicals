/**
 * Role-Based Access Control (RBAC) Guard Middleware
 * Verifies that the authenticated user possesses one of the permitted roles
 */
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User authentication required prior to role verification.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `RBAC Access Denied: User role '${req.user.role}' lacks permission for this action. Required role(s): [${allowedRoles.join(', ')}].`
      });
    }

    next();
  };
};
