import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

import { useField } from "./hooks/useField";
const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to={`/`} style={padding}>
        anecdotes
      </Link>
      <Link to={`/create`} style={padding}>
        create new
      </Link>
      <Link to={`/about`} style={padding}>
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      has {anecdote.votes} votes for more info see{" "}
      <a href={anecdote.info}>{anecdote.info}</a>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const [redirect, setRedirect] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    setRedirect(true);
  };
  if (redirect) return <Redirect to="/"></Redirect>;
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content.value}
            onChange={(e) => content.onChange(e)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author.value}
            onChange={(e) => author.onChange(e)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info.value}
            onChange={(e) => info.onChange(e)}
          />
        </div>
        <button>create</button>
        <button onClick={(e)=>{
          e.preventDefault();
          content.reset();
          author.reset();
          info.reset();
        }}>reset</button>

      </form>
    </div>
  );
};

const Notification = ({ notification }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const match = useRouteMatch("/anecdotes/:id");
  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`a new anecdote created:${anecdote.content}`);
    setTimeout(() => setNotification(""), 2000);
  };

  const anecdoteById = match
    ? anecdotes.find((a) => a.id === match.params.id)
    : null;

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <Notification notification={notification} />}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdoteById} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
