import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { anecdotesVote } from "../../actions/anecdoteActions";
import { notificationSet } from "../../actions/notificationActions";
import { Link, useRouteMatch, Route, Switch } from "react-router-dom";
import Anecdote from "../../pages/Anecdote/index";
import { anecdotesInitialize } from "../../actions/anecdoteActions";

import AnecdoteForm from "../../components/AnecdoteForm/index";
import Filter from "../../components/Filter/index";
const AnecdoteList = (props) => {
  console.log(useSelector((state) => state));
  const { anecdotes } = useSelector((state) => state.anecdoteReducer);
  const { filter } = useSelector((state) => state.filterReducer);
  const dispatch = useDispatch();
  //useDispatch-hook provides access to the dispatch-function of the redux-store defined in index.js

  useEffect(() => {
    dispatch(anecdotesInitialize());
  }, [dispatch]);

  const vote = (anecdote) => {
    dispatch(anecdotesVote(anecdote));
    dispatch(notificationSet("you voted " + anecdote.content, 2));
  };

  const match = useRouteMatch("/anecdotes/:id");
  const anecdoteById = match
    ? anecdotes.find((a) => a.id === match.params.id)
    : null;

  const renderAnecdotes = anecdotes
    .filter((n) => n.content.toLowerCase().includes(filter))
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ));

  const routes = [
    {
      path: "/anecdotes/:id",
      render: () => <Anecdote anecdote={anecdoteById} />,
    },
    {
      path: "/",
      render: () => (
        <div>
          <AnecdoteForm />
          <Filter />
          {renderAnecdotes}
        </div>
      ),
    },
  ];

  const renderRoutes = routes.map((r) =>
    r.render ? (
      <Route path={r.path} render={r.render} />
    ) : (
      <Route path={r.path} component={r.component} />
    )
  );
  return (
    <div>
      <Switch>{renderRoutes}</Switch>
    </div>
  );
};

export default AnecdoteList;
