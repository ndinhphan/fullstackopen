
const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', { username:1,name:1 });
  response.json(result);
});

blogsRouter.post('/', async (request, response) => {
  let blog = new Blog(request.body);

  // const token = getTokenFrom(request);
  //token is extracted with a middleware
  const token = request.token;

  //verify token
  // if(token) const decodedToken = jwt.verify(token,process.env.SECRET);
  // if(!token || !decodedToken) return response.status(400).json({ error: 'token missing or invalid' });

  // const user = await User.findById(decodedToken.id);
  const user = request.user;

  if(user){
    blog.user = user._id;
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    return response.status(201).json(savedBlog);
  } else {
    return response.status(400).json({ error: 'token missing or invalid' });
  }

});

blogsRouter.delete('/:id', async (request, response) => {

  // const token = getTokenFrom(request);
  //token is extracted with a middleware
  const token = request.token;
  //verify token
  if(!token) return response.status(400).json({ error: 'token missing or invalid' });
  const decodedToken = jwt.verify(token,process.env.SECRET);
  if(!decodedToken) return response.status(400).json({ error: 'token missing or invalid' });

  const user = request.user;
  const deleteBlog = await Blog.findById(request.params.id);
  // console.log(user.id.toString());
  // console.log(deleteBlog.user.toString());
  if(!deleteBlog) return response.status(204).end();
  if(user.id.toString() ===  deleteBlog.user.toString()){
    await deleteBlog.delete();
    return response.status(204).end();
  }
  else {
    return response.status(401).json({ error:'invalid user token' });
  }
  // response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  let blog = await Blog.findById(request.params.id);
  let updatedBlog = JSON.parse(JSON.stringify(blog));
  updatedBlog = { ...updatedBlog, likes: body.likes };
  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true });

  response.json(result);
});



module.exports = blogsRouter;