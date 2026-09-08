const jwt = require('jsonwebtoken');


const generateToken = (email) => {
  return jwt.sign(
    {
      email,
      role: 'superadmin',
      name: 'Master Admin'
    },
    process.env.JWT_SECRET || 'sepl_super_secret_jwt_key_2026_x89!#',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    }
  );
};


const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validate incoming inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    // 2. Read configured credentials from environment variables
    const envAdminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const envAdminPassword = (process.env.ADMIN_PASSWORD || '').trim();

    if (!envAdminEmail || !envAdminPassword) {
      return res.status(500).json({
        success: false,
        message: 'ADMIN_EMAIL and ADMIN_PASSWORD are not configured in the server environment (.env).'
      });
    }

    const inputEmail = String(email).trim().toLowerCase();
    const inputPassword = String(password).trim();

    // 3. Compare with .env credentials
    if (inputEmail !== envAdminEmail || inputPassword !== envAdminPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 4. Generate signed JWT token
    const token = generateToken(envAdminEmail);

    return res.status(200).json({
      success: true,
      message: 'Admin login successful.',
      token,
      admin: {
        name: 'Master Admin',
        email: envAdminEmail,
        role: 'superadmin'
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Disabled signup endpoint (Registration is closed; .env controls access)
 * @route   POST /api/admin/signup
 * @access  Disabled
 */
const signupAdmin = async (req, res) => {
  return res.status(403).json({
    success: false,
    message: 'Admin registration is disabled. Only the administrator specified in .env can log in.'
  });
};

/**
 * @desc    Get currently authenticated admin profile
 * @route   GET /api/admin/profile
 * @access  Private (JWT Protected)
 */
const getAdminProfile = async (req, res) => {
  const envAdminEmail = (process.env.ADMIN_EMAIL || req.admin?.email || '').trim().toLowerCase();

  return res.status(200).json({
    success: true,
    admin: {
      name: 'Master Admin',
      email: envAdminEmail,
      role: 'superadmin'
    }
  });
};

module.exports = {
  loginAdmin,
  signupAdmin,
  getAdminProfile,
  // Lowercase aliases
  loginadmin: loginAdmin,
  signupadmin: signupAdmin,
  getadminprofile: getAdminProfile
};
