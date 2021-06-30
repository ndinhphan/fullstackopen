import { useDispatch } from "react-redux";
import { anecdotesCreate } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();
  const create = async (event) => {
    event.preventDefault();
    const content = event.target.createAnecdote.value;
    event.target.createAnecdote.value = "";

    console.log("create", content);
    dispatch(anecdotesCreate(content));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="createAnecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
