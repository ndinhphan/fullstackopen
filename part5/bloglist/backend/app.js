/* eslint-disable no-undef */

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogsRouter = require('./controller/blogs.js');
const usersRouter = require('./controller/users.js');
const loginRouter = require('./controller/login.js');

const mongoUrl = config.MONGODB_URI;
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
logger.info('connecting to', config.MONGODB_URI);

//eliminating try-catch blocks if its just next(exception)
require('express-async-errors');


mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.use(cors());
app.use(express.json());
var morgan = require('morgan');
app.use(express.static('build'));

app.use(morgan(function (tokens, req, res) {
  // console.log(req.body)
  return [
    req.method,
    req.url,
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ');
}));

app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);



app.use('/api/users',usersRouter);
app.use('/api/blogs',blogsRouter);
app.use('/api/login',loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;