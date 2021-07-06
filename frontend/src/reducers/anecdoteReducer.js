export const VOTE_ANECDOTE_SUCCESS = "VOTE_ANECDOTE_SUCCESS";
const CREATE_ANECDOTE_SUCCESS = "CREATE_ANECDOTE_SUCCESS";
const INIT_ANECDOTE_SUCCESS = "INIT_ANECDOTE_SUCCESS";

const initialState = { anecdotes: [] };
const anecdoteReducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  const {anecdotes} = state
  switch (action.type) {
    case VOTE_ANECDOTE_SUCCESS:
      console.log(action);
      const id = action.id;
      const anecdote = state.anecdotes.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      return {...state, anecdotes: anecdotes.map((n) => (n.id === id ? changedAnecdote : n))};
    case CREATE_ANECDOTE_SUCCESS:
      
      return {...state, anecdotes: anecdotes.concat(action.anecdote.data)};
    case INIT_ANECDOTE_SUCCESS:
      return {...state, anecdotes: action.anecdotes.data};
    default:
      return state;
  }
};

export default anecdoteReducer;
