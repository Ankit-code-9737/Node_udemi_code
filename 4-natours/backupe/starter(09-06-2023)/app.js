const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandeler = require('./controller/errorController');
const tourRouter = require('./routers/tourRouter');
const userRouter = require('./routers/userRouter');

const app = express();

// MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello i am a middelware ⛏️');
//   next();
// });

app.use((req, res, next) => {
  req.requestTimt = new Date().toISOString();
  next();
});

// Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new error(`Can find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = '400';
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandeler);

module.exports = app;
