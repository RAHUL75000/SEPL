const express = require('express');
const router = express.Router();
const { submitContact, getContactHealth } = require('../controllers/contactController');

// Health check endpoint
router.get('/health', getContactHealth);

// Contact enquiry submission endpoint
router.post('/', submitContact);

module.exports = router;
