export const errorHandler = (err, req, res) => {
  console.error(`[EXPRESS ERROR] ${err.message}`, err.stack);

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'An unexpected server error occurred.' : err.message;

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};
