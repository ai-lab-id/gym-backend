import ClientError from './client-error.js';

class UnauthorizedError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export default UnauthorizedError;
