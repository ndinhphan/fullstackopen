export const anecdotesVote = (anecdote) => {
  return {
    type: "VOTE_ANECDOTE",
    data: {
      id: anecdote.id,
    },
  };
};

export const anecdotesCreate = ({ content, author, info }) => {
  return {
    type: "CREATE_ANECDOTE",
    data: {
      anecdote: { content, author, info },
    },
  };
};

export const anecdotesInitialize = () => {
  return {
    type: "INIT_ANECDOTE",
  };
};
