// Centralized error handler — every error in the app (validation errors,
// not-found errors, or unexpected exceptions) is funneled here for a
// consistent JSON response shape.
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
};

// 404 handler for routes that don't exist at all
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = { errorHandler, notFoundHandler };
