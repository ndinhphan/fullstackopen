const listHelper = require('../utils/list_helper');
const helper = require('./test_helper');
test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});






describe('totalLikes', () => {
  test('when list has one blog, total likes = likes of that blog', () => {
    expect(listHelper.totalLikes(helper.listWithOneBlog)).toBe(5);
  });
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
  test('of a bigger list is correct', () => {
    expect(listHelper.totalLikes(helper.listWithManyBlogs)).toBe(1003);
  });
});

describe('most favorite blog', () => {
  test('of list with one blog, should be that blog', () => {
    expect(listHelper.favoriteBlog(helper.listWithOneBlog)).toEqual(helper.listWithOneBlog[0]);
  });
  test('of list with many blogs should be the correct blog', () => {
    expect(listHelper.favoriteBlog(helper.listWithManyBlogs)).toEqual(helper.listWithManyBlogs[0]);
  });
  // test('of list with no blog', () => {
  //   expect(listHelper.favoriteBlog([])).toEqual(listWithOneBlog[0]);
  // });
});

describe('most blogs out of a blogger', () => {
  test('of list 2 bloggers', () => {
    expect(listHelper.mostBlogs(helper.listWithManyBloggers)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });
});