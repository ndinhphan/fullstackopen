
const usersRouter = require('express').Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');


usersRouter.get('/', async (request,response) => {
  // populate whatever field defined with 1
  const users = await User.find({}).populate('blogs', { title:1, likes:1, url:1 });
  response.json(users);
});
usersRouter.post('/', async (request,response, next) => {
  const body = request.body;
  const saltRounds = 10;
  if (body.password.length <=3) {
    return response.status(400).json({ error:'password length must be larger than 3' });
  }
  const passwordHash = await bcrypt.hash(body.password,saltRounds);
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  try{
    const savedUser = await user.save();
    response.json(savedUser);
  } catch(exception){
    next(exception);
  }
});


module.exports = usersRouter;