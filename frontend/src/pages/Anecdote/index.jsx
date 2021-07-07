import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { anecdotesVote } from "../../actions/anecdoteActions";
import { notificationSet } from "../../actions/notificationActions";
import { useSelector } from "react-redux";
const Anecdote = () => {
  // const { content } = anecdote || {};
  const { anecdotes } = useSelector((state) => state.anecdoteReducer);

  const { id } = useParams();
  const dispatch = useDispatch();
  //useDispatch-hook provides access to the dispatch-function of the redux-store defined in index.js
  const vote = (anecdote) => {
    dispatch(anecdotesVote(anecdote));
    dispatch(notificationSet("you voted " + anecdote.content, 2));
  };
  const anecdote = anecdotes.find((a) => a.id === id);
  const { content } = anecdote || {};

  console.log(anecdote);
  return (
    <div>
      <h2>
        {content} by {anecdote.author}
      </h2>
      has {anecdote.votes} {anecdote.votes > 1 ? "votes" : "vote"}{" "}
      <button onClick={() => vote(anecdote)}>vote</button>{" "}
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
