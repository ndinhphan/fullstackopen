
const loginRouter = require('express').Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request,response) => {
  const body = request.body;
  const user = await User.findOne({ username: body.username });
  //compare passwords
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);
  if(!(user && passwordCorrect)){
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  //sign token then return
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn:3600 }
  );

  response.status(200).send({
    token, username: user.username, name: user.name
  });

});


module.exports = loginRouter;