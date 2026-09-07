const mongoose = require('mongoose');

// Email regex pattern for RFC 5322 standard validation
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    companyName: {
      type: String,
      trim: true,
      maxlength: [150, 'Company name cannot exceed 150 characters'],
      default: ''
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [emailRegex, 'Please provide a valid email address']
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [30, 'Phone number cannot exceed 30 characters'],
      default: ''
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [200, 'Subject cannot exceed 200 characters'],
      default: 'General Enquiry'
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      minlength: [5, 'Message must be at least 5 characters long'],
      maxlength: [3000, 'Message cannot exceed 3000 characters']
    }
  },
  {
    timestamps: true,
    collection: 'contacts'
  }
);

// Index for query optimization
contactSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);
