const express = require('express');
const router = express.Router();
const {
  loginAdmin,
  signupAdmin,
  getAdminProfile
} = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Admin Login (.env credentials verification)
router.post('/login', loginAdmin);

// Disabled Signup (Registration is locked; only .env admin is permitted)
router.post('/signup', signupAdmin);

// Protected Admin Profile Route
router.get('/profile', protectAdmin, getAdminProfile);

module.exports = router;
