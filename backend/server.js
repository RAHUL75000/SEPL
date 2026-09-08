const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

const contactRoutes = require('./routes/contactRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/saina_exhibitions';

// Middleware: Enable CORS
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Middleware: Request Body Parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Database Connection with Retry Logic
const connectDB = async () => {
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

connectDB();

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'Healthy',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/contact', contactRoutes);

// Serve Frontend Static Files
// Resolves to ../frontend (or fallback to ./public)
const frontendDirectory = path.join(__dirname, '../frontend');
app.use(express.static(frontendDirectory));

// Fallback to index.html for single-page application routing
app.get('*', (req, res, next) => {
  // Pass unknown API routes to the API 404 handler
  if (req.path.startsWith('/api/')) {
    return next();
  }
  res.sendFile(path.join(frontendDirectory, 'index.html'));
});

// Centralized API 404 & Error Handlers
app.use('/api/*', notFound);
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, () => {
  console.log(`[SEPL Server] Saina Exhibitions Corporate Server is running on port ${PORT}`);
  console.log(`[SEPL Server] Local URL: http://localhost:${PORT}`);
  console.log(`[SEPL Server] Serving frontend from: ${frontendDirectory}`);
});

// Graceful Shutdown Handling
process.on('SIGTERM', () => {
  console.log('[SEPL Server] SIGTERM signal received: closing HTTP server');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('[SEPL Server] MongoDB connection closed.');
      process.exit(0);
    });
  });
});

module.exports = app;
