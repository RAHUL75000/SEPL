const jwt = require('jsonwebtoken');

/**
 * Middleware: Verifies JWT token for the master admin configured in .env
 */
const protectAdmin = async (req, res, next) => {
  let token;

  // Extract token from Authorization header (Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided. Please supply Bearer <token> in the Authorization header.'
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'sepl_super_secret_jwt_key_2026_x89!#'
    );

    const envAdminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();

    // Verify token belongs to the active admin email configured in .env
    if (!envAdminEmail || decoded.email !== envAdminEmail) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, admin credentials have changed or are invalid.'
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error('[JWT Auth Middleware Error]:', error.message);
    return res.status(401).json({
      success: false,
      message: error.name === 'TokenExpiredError'
        ? 'Session expired. Please log in again.'
        : 'Not authorized, invalid token.'
    });
  }
};

module.exports = { protectAdmin };
