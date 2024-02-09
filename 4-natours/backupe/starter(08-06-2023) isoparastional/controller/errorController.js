const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  console.log('================== message');
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
  // const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  // console.log(value);

  console.log('-------------ddddddddddddd');

  // const message = `Duplicate field value: ${value}. Please use another value!`;
  // return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErroProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log('----------- Operational working');

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other know error: Don't leak error details
  } else {
    // 1) Log message
    console.log('Error⚡', err);

    // 2) Send message
    res.status(500).json({
      status: 'error',
      message: 'Something is wrong!',
      error: err,
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == 'production') {
    let error = { ...err };

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === '11000') error = handleDuplicateFieldDB(error);

    sendErroProd(error, res);
  }
};
