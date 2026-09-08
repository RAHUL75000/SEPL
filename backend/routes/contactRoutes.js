const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContactHealth,
  getAllContacts,
  getContactById,
  deleteContact
} = require('../controllers/contactController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Health check endpoint
router.get('/health', getContactHealth);

// Public enquiry submission
router.post('/', submitContact);

// Admin-only enquiry management endpoints (JWT Protected)
router.get('/all', protectAdmin, getAllContacts);
router.get('/:id', protectAdmin, getContactById);
router.delete('/:id', protectAdmin, deleteContact);

module.exports = router;
