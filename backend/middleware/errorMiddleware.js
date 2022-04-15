const errorHandler = (err, req,res, next) => {
  /// If have status Code set to statusCode, else 500 error server
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production ' ? null : err.stack
  })
}

module.exports = {
  errorHandler
}