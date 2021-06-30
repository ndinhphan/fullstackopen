import { useSelector, useDispatch } from "react-redux";
import { anecdotesVote } from "../reducers/anecdoteReducer";
import { notificationSet } from "../reducers/notificationReducer";
const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  //useDispatch-hook provides access to the dispatch-function of the redux-store defined in index.js
  const vote = (anecdote) => {
    dispatch(anecdotesVote(anecdote));
    dispatch(notificationSet("you voted " + anecdote.content, 2));
  };

  return (
    <div>
      {anecdotes
        .filter((n) => n.content.toLowerCase().includes(filter))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
