import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

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
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

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

  const createForm = () => (
    <div>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
  const loginForm = () => {
    if (user === null) {
      return (
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
          </div>
          <div>
            <button type="submit">login</button>
          </div>
        </form>
      );
    } else
      return (
        <div>
          <h1>logged in as {user.name}</h1>
          <button onClick={handleLogout}>log out</button>
          <h2>blogs</h2>
          <h3>create a new blog</h3>
          {createForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      );
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };
  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const result = await blogService.create({ title, author, url });
    setBlogs(blogs.concat(result));
    setMessage(`a new blog ${title} by ${author} has been added`);
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

      {loginForm()}
    </>
  );
};

export default App;
