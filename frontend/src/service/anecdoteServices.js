import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response;
};

const vote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const anecdote = response.data;
  if (anecdote.hasOwnProperty("votes")) {
    const result = await axios.put(`${baseUrl}/${id}`, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    return result.data.id;
  }
};
const anecdoteServices = { getAll, create, vote };
export default anecdoteServices;
