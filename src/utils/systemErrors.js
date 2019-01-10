class BaseError {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

class InternalServerError extends BaseError {
  constructor(err) {
    super(500, 'Something went wrong');
    this.description = err;
  }
}
exports.BaseError = BaseError;
exports.InternalServerError = InternalServerError;
