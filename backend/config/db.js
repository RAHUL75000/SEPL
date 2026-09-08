const mongoose = require('mongoose');

// Database Connection with Retry Logic
const connectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/saina_exhibitions';
  if (!process.env.MONGODB_URI) {
    console.warn('[MongoDB Warning] MONGODB_URI environment variable is not defined. Falling back to local mongodb://127.0.0.1:27017 (this will fail on cloud deployments like Render/Vercel).');
  } else if (process.env.MONGODB_URI.includes('<password>') || process.env.MONGODB_URI.includes('<db_password>')) {
    console.error('[MongoDB Error] MONGODB_URI contains unreplaced placeholder "<password>" or "<db_password>". Replace it with your actual MongoDB Atlas password in the hosting dashboard.');
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // Fast fail in 5 seconds instead of hanging for 30s
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    // Do not crash the entire process so static frontend can still serve if DB is rebooting
  }
};

module.exports = connectDB;