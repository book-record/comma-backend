require('dotenv').config();
require('express-async-errors');
const path = require('path');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const connect = require('./database/connect');
const authRouter = require('./routes/auth');
const bookRouter = require('./routes/book');
const reportRouter = require('./routes/report');
const reviewRouter = require('./routes/review');

connect();

const corsOptions = {
  origin: process.env.CORS_ORIGIN_URL,
  credentials: true,
};

const app = express();
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/auth', authRouter);
app.use('/book', bookRouter);
app.use('/review', reviewRouter);
app.use('/report', reportRouter);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.use(function (error, req, res, next) {
  const message =
    req.app.get('env') === 'development'
      ? error.message
      : 'Invalid Server Error';

  console.error(error);
  res.status(error.status || 500).send(message);
});

module.exports = app;
