import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm.js";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  return <div className={type}>{message}</div>;
};


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const blogRef = useRef();
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };
  const handleCreateBlog = async ({ blogObject }) => {
    console.log("creating blog:", blogObject);
    const result = await blogService.create(blogObject);
    setBlogs(blogs.concat(result));
    blogRef.current.toggleVisibility();
    setMessage(`a new blog ${result.title} by ${result.author} has been added`);
    setMessageType("success");
    setTimeout(() => setMessage(null), 5000);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      setMessage("Wrong Credentials");
      setMessageType("error");
      setTimeout(() => setMessage(null), 5000);
    }
  };
  return (
    <>
      <Notification message={message} type={messageType} />
      {user === null && (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}
      {user !== null && (
        <div>
          logged as {user.name} <button onClick={handleLogout}>logout</button>
          <div>
            <Togglable buttonLabel="create blog" ref={blogRef}>
              <BlogForm createBlog={handleCreateBlog} />
            </Togglable>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
