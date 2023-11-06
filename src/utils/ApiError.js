class ApiError extends Error {
  constructor(
    statusCode,
    errorMessage = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(errorMessage);
    this.statusCode = statusCode;
    this.data = null;
    this.errorMessage = errorMessage;
    this.success = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
