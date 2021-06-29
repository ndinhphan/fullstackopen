const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
const api = supertest(app);
const helper = require('./test_helper');
const bcrypt = require('bcryptjs');


describe('when there is initially one user', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('secret',10);
    const user = new User({
      username: 'root',
      name: 'rootuser',
      passwordHash
    });
    await user.save();
  });

  test('creating another user with a new name', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'newuser',
      name:'newName',
      password: 'goodpassword'
    };
    await api.post('/api/users').send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creating new user with existing name should fail with proper status code', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'root',
      name: 'rootuser',
      password: 'goodpassword'
    };
    const result = await api.post('/api/users').send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(result.body.error).toContain('`username` to be unique');
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

});

afterAll(() => {
  mongoose.connection.close();
});
