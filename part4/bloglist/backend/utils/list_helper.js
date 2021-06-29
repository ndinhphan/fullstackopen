var _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum,item) => {
    return sum+=item.likes;
  };
  const total = blogs.reduce(reducer,0);
  return blogs.length === 0 ? 0 : total;
};

const favoriteBlog = (blogs) => {
  const reducer = (mostFav, currentItem) => {
    return mostFav.likes > currentItem.likes ? mostFav : currentItem;
  };
  const mostFavoriteBlog = blogs.reduce(reducer,{});
  return blogs.length === 0 ? {} : mostFavoriteBlog;
};

const mostBlogs = (blogs) => {
  const countBlogs = _.countBy(blogs,'author');
  const result = _.max(Object.keys(countBlogs), o => countBlogs[o]);
  return {
    author: result,
    blogs: countBlogs[result],
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };