// middlewares are processing functions when called with next()

const logger = require('./logger');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const requestLogger = (request) => {
  logger.info('Method: ',request.method);
  logger.info('Path:',request.path);
  logger.info('Body', request.body);
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  // MongoDB Validation Error
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' });
  }
  next(error);
};


//extract token and put it into request when request gets passed through middlewares
const tokenExtractor = (request, response, next) => {
  console.log('token extractor is working');
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')){
    request.token = authorization.substring(7);
  } else request.token = null;
  next();
};

const userExtractor = async (request, response, next) => {
  console.log('user extractor is working');
  if(request.token !== null){
    const decodedToken = jwt.verify(request.token,process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    if(user) request.user = user;
  } else request.user = null;
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};


module.exports = { errorHandler,unknownEndpoint, requestLogger, tokenExtractor, userExtractor };