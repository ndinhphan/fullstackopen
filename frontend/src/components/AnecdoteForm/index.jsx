import { useDispatch } from "react-redux";
import { useField } from "../../hooks/useField";
import { anecdotesCreate } from "../../actions/anecdoteActions";
import Togglable from "../Togglable";
import { useRef } from "react";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const content = useField("text");
  const info = useField("text");
  const author = useField("text");
  const ref = useRef();

  const clearAnecdoteForm = () => {
    [content, info, author].forEach((current) => current.reset());
  };

  const create = async (event) => {
    event.preventDefault();
    dispatch(
      anecdotesCreate({
        content: content.value,
        author: author.value,
        info: info.value,
      })
    );
    ref.current.toggleVisibility();
    clearAnecdoteForm();
  };

  const handleOnCancel = (event) => {
    console.log("cancelled");
    event.preventDefault();
    clearAnecdoteForm();
    ref.current.toggleVisibility();
  };
  return (
    <Togglable ref={ref} hideCancelButton buttonLabel="create new anecdote">
      <div>
        <h2>create new</h2>
        <form onSubmit={create}>
          <div>
            content
            <input
              name="content"
              value={content.value}
              onChange={content.onChange}
            />
          </div>
          <div>
            author
            <input
              name="author"
              value={author.value}
              onChange={author.onChange}
            />
          </div>
          <div>
            url for more info
            <input name="info" value={info.value} onChange={info.onChange} />
          </div>
          <button>create</button>
          <button onClick={handleOnCancel}>cancel</button>
        </form>
      </div>
    </Togglable>
  );
};

export default AnecdoteForm;
