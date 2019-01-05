class BaseError extends Error {
  constructor(statusCode, description, internalError) {
    super(internalError ? internalError.message : description);
    if (internalError) {
      this.stack = internalError.stack;
      this.name = internalError.name;
    } else {
      Error.captureStackTrace(this, BaseError);
    }
    this.statusCode = statusCode;
    this.description = description;
  }
}

class InternalServerError extends BaseError {
  constructor(internalError) {
    super(500, 'Something went wrong please try again later.', internalError);
  }
}

exports.BaseError = BaseError;
exports.InternalServerError = InternalServerError;
