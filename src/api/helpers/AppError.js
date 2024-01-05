class AppError extends Error {
  constructor(errorCode, message = "An Error Ocured", statusCode) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
