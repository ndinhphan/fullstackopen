import {useState} from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    createBlog({ blogObject: { title, url, author } });
    setTitle("");
    setUrl("");
    setAuthor("");
  };
  return (
    <div>
      <h2>blogs</h2>
      <h3>create a new blog</h3>
      <div>
        <form onSubmit={addBlog}>
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
    </div>
  );
};

export default BlogForm

