/**
 * 404 Not Found Middleware for unknown API routes
 */
const notFound = (req, res, next) => {
  const error = new Error(`API endpoint not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Centralized Error Handling Middleware
 * Ensures sensitive database and server stack traces are not leaked to clients.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Unable to submit your enquiry.';

  // Handle Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map((val) => val.message);
    message = errors.join(', ');
  }

  // Handle Mongoose CastError (invalid ObjectId / type cast)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid format for field: ${err.path}`;
  }

  // Handle SyntaxError in request body (e.g. malformed JSON)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'Malformed JSON request body.';
  }

  // Generic 500 error sanitization for production security
  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    message = 'Internal server error. Please try again later.';
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = {
  notFound,
  errorHandler
};
