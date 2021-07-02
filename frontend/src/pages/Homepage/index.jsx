import AnecdoteForm from "../../components/AnecdoteForm/index";
import AnecdoteList from "../../components/AnecdoteList/index";
import Anecdote from "../Anecdote";
import Filter from "../../components/Filter/index";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { anecdotesInitialize } from "../../actions/anecdoteActions";
import { useRouteMatch, Route, Switch } from "react-router";
const Homepage = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((store) => store.anecdotes);

  useEffect(() => {
    dispatch(anecdotesInitialize());
  }, [dispatch]);
  const match = useRouteMatch("/anecdotes/:id");
  const anecdoteById = match
    ? anecdotes.find((a) => a.id === match.params.id)
    : null;
  return (
    <div>
      <Switch>
        <Route
          path="/anecdotes/:id"
          render={() => <Anecdote anecdote={anecdoteById} />}
        />
        <Route
          path="/"
          render={() => (
            <div>
              <AnecdoteForm />
              <Filter />
              <AnecdoteList />
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

export default Homepage;
