import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { anecdotesVote } from "../../actions/anecdoteActions";
import { notificationSet } from "../../actions/notificationActions";
import { Link, Route, Switch } from "react-router-dom";
import Anecdote from "../../pages/Anecdote/index";
import { anecdotesInitialize } from "../../actions/anecdoteActions";

import AnecdoteForm from "../../components/AnecdoteForm/index";
import Filter from "../../components/Filter/index";
const AnecdoteList = (props) => {
  console.log(useSelector((state) => state));
  const { anecdotes } = useSelector((state) => state.anecdoteReducer);
  const { filter: filteredAnecdote } = useSelector(
    (state) => state.filterReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(anecdotesInitialize());
  }, []);

  const renderRoutes = useMemo(() => {
    const vote = (anecdote) => () => {
      dispatch(anecdotesVote(anecdote));
      dispatch(notificationSet("you voted " + anecdote.content, 2));
    };
    const renderAnecdotes = anecdotes
      .filter((n) => n.content.toLowerCase().includes(filteredAnecdote))
      .sort((a, b) => b.votes - a.votes)
      .map((anecdote) => (
        <div key={anecdote.id}>
          <Link
            to={{
              pathname: `/anecdotes/${anecdote.id}`,
            }}
          >
            {anecdote.content}
          </Link>
          <div>
            has {anecdote.votes}
            <button onClick={vote(anecdote)}>vote</button>
          </div>
        </div>
      ));

    const routes = [
      {
        path: "/anecdotes/:id",
        render: () => <Anecdote />,
      },
      {
        path: "*",
        render: () => (
          <div>
            <AnecdoteForm />
            <Filter />
            {renderAnecdotes}
          </div>
        ),
      },
    ];

    return routes.map((r) =>
      r.render ? (
        <Route path={r.path} render={r.render} />
      ) : (
        <Route path={r.path} component={r.component} />
      )
    );
  }, [anecdotes, filteredAnecdote]);

  return (
    <div>
      <Switch>{renderRoutes}</Switch>
    </div>
  );
};

export default AnecdoteList;
