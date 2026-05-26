import { ClientError } from '../exceptions/index.js';

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
    });
  }

  if (err.isJoi) {
    return res.status(400).json({
      status: 'fail',
      message: err.details[0].message,
    });
  }

  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error('Unhandled Error:', err);

  return res
    .status(status)
    .json({
      status: status < 400 ? 'success' : 'fail',
      message,
    })
    .end();
};

export default ErrorHandler;
