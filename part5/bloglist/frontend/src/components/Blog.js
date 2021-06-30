import React from "react";
import Togglable from "./Togglable";
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <Togglable buttonLabel="show">
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes}</p>
      <p>author: {blog.author}</p>
    </Togglable>
  </div>
);

export default Blog;
