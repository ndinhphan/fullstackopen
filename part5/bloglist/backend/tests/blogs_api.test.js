const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const api = supertest(app);
const helper = require('./test_helper');


beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  // for (let blog of helper.initialBlogs){
  //   let newBlog = new Blog(blog);
  //   await newBlog.save();
  // }
});

test('blogs are returned as json a correct amount',async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);

});

test('blog can be created, total blog +1, content of blog added', async () => {
  const newBlog = {
    title: 'new test blog yo',
    author: 'me',
    url: 'http://www.u.arizona.edu/',
  };

  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titles = response.body.map(r => r.title);
  expect(response.body).toHaveLength(helper.initialBlogs.length+1);
  expect(titles).toContain(newBlog.title);
});


test('blogs id_ are returned id instead',async () => {
  const blog = {
    _id: '5a333aa71b54a676234d17f8',
    title: 'new test blog yo',
    author: 'me',
    url: 'http://www.u.arizona.edu/',
  };
  let newBlog = new Blog(blog);
  await newBlog.save();

  const response = await api.get('/api/blogs');
  // const ids = response.body.map(r => r.id);
  expect(response.body).toHaveLength(helper.initialBlogs.length+1);
  expect(response.body[0].id).toBeDefined;

  // expect(ids).toContain(newBlog._id);

});

describe('deleting blog', () => {
  test('non existing id should return 204', async () => {
    const id = await helper.nonExistingId();
    await api.delete(`/api/blogs/${id}`).expect(204);
  });
  test('succeeds deleting existing blog and returns 204',async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length -1 );
    const ids = blogsAtEnd.map(blog => blog.id);
    expect(ids).not.toContain(blogToDelete.id);
  });
});

describe('updating likes of one blog', () => {
  test('non existing id should return 200?', async () => {
    const id = await helper.nonExistingId();
    await api.put(`/api/blogs/${id}`).send({ likes: 1000 }).expect(200);
  });
  test('succeeds updating likes of an existing blog and returns 200',async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: 1000 }).expect(200);
    const updatedBlog = await Blog.findById(blogToUpdate.id);
    expect(updatedBlog.likes).toBe(1000);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
