import { put, takeEvery, all, call } from "@redux-saga/core/effects";
import anecdoteServices from "./service/anecdoteServices";

function* createAnecdote(action) {
  yield console.log("saga create action:",action);
  const content = action.data.content;
  const newAnecdote = yield call(anecdoteServices.create,{ content, votes: 0 });
  // yield put({type:'CREATE_ANECDOTE_SUCCESS',anecdote:newAnecdote})
}

function* voteAnecdote(action) {
  yield console.log("saga vote action",action);
  const id = action.data.id
  const result = yield call(anecdoteServices.vote,id);
  yield put({type:"VOTE_ANECDOTE_SUCCESS", result})
}
function* initializeAnecdote(action) {
  const anecdotes = yield call(anecdoteServices.getAll);
  yield put({type:"INIT_ANECDOTE_SUCCESS", anecdotes})
}

function* createAnecdoteWatcher() {
  yield takeEvery("CREATE_ANECDOTE", createAnecdote);
}

function* voteAnecdoteWatcher() {
  yield takeEvery("VOTE_ANECDOTE", voteAnecdote);
}
function* initializeAnecdoteWatcher() {
  yield takeEvery("INIT_ANECDOTE", initializeAnecdote);
}

export default function* rootSage() {
  yield all([
    voteAnecdoteWatcher(),
    initializeAnecdoteWatcher(),
    createAnecdoteWatcher(),
  ]);
}
