import anecdoteServices from "../service/anecdoteServices";
export const anecdotesVote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteServices.vote(anecdote.id);
    dispatch({
      type: "VOTE",
      data: {
        id: anecdote.id,
      },
    });
  };
};

export const anecdotesCreate = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.create({ content, votes: 0 });
    dispatch({
      type: "CREATE",
      data: {
        anecdote: newAnecdote.data,
      },
    });
  };
};

export const anecdotesInitialize = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll();
    dispatch({
      type: "INIT_ANEC",
      data: {
        anecdotes: anecdotes.data,
      },
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const anecdote = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      return state.map((n) => (n.id === id ? changedAnecdote : n));
    case "CREATE":
      return state.concat(action.data.anecdote);
    case "INIT_ANEC":
      return action.data.anecdotes;
    default:
      return state;
  }
};

export default anecdoteReducer;
