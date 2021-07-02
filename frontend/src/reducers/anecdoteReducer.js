export const VOTE_ANECDOTE_SUCCESS = 'VOTE_ANECDOTE_SUCCESS'
const CREATE_ANECDOTE_SUCCESS = 'CREATE_ANECDOTE_SUCCESS'
const INIT_ANECDOTE_SUCCESS = 'INIT_ANECDOTE_SUCCESS'

const initialState = {}
const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case VOTE_ANECDOTE_SUCCESS:
      console.log(action);
      const id = action.id;
      const anecdote = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      return state.map((n) => (n.id === id ? changedAnecdote : n));
    case CREATE_ANECDOTE_SUCCESS:
      return state.concat(action.anecdote.data);
    case INIT_ANECDOTE_SUCCESS:
      return action.anecdotes.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
