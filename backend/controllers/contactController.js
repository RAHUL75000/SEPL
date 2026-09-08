const mongoose = require('mongoose');
const Contact = require('../models/Contact');

/**
 * Basic HTML/Script tag sanitization helper
 * Strips out dangerous HTML tags, javascript pseudo-protocols, and script tags
 */
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
};

/**
 * Validates email format according to standard patterns
 */
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return typeof email === 'string' && emailRegex.test(email.trim());
};

/**
 * @desc    Submit a new contact enquiry
 * @route   POST /api/contact
 * @access  Public
 */
const submitContact = async (req, res, next) => {
  try {
    const { name, companyName, email, phone, subject, message } = req.body;

    // 1. Mandatory Fields Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Full Name is required.'
      });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.'
      });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required.'
      });
    }

    if (message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 5 characters long.'
      });
    }

    // 2. Data Sanitization
    const sanitizedData = {
      name: sanitizeInput(name),
      companyName: sanitizeInput(companyName || ''),
      email: email.trim().toLowerCase(),
      phone: sanitizeInput(phone || ''),
      subject: sanitizeInput(subject || 'Business Enquiry'),
      message: sanitizeInput(message)
    };

    // 3. Verify Database Connection
    if (mongoose.connection.readyState !== 1) {
      console.error(`[Database Error] MongoDB is not connected (readyState: ${mongoose.connection.readyState}). Check MONGODB_URI & IP whitelist.`);
      return res.status(503).json({
        success: false,
        message: 'Database connection is currently unavailable. Please verify MONGODB_URI and MongoDB Atlas IP whitelist.'
      });
    }

    // 4. Create and Save Document in MongoDB
    const newContact = new Contact(sanitizedData);
    await newContact.save();

    // 5. Return Success Response
    return res.status(201).json({
      success: true,
      message: 'Your enquiry has been submitted successfully.'
    });
  } catch (error) {
    // Pass to centralized error handler
    next(error);
  }
};

/**
 * @desc    API Health status check
 * @route   GET /api/contact/health
 * @access  Public
 */
const getContactHealth = async (req, res) => {
  res.status(200).json({
    success: true,
    status: 'Operational',
    service: 'SEPL Contact API'
  });
};

module.exports = {
  submitContact,
  getContactHealth
};
