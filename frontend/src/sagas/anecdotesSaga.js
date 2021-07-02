import { put, takeEvery, all, call, delay, takeLatest } from "@redux-saga/core/effects";
import anecdoteServices from "../service/anecdoteServices";

const CREATE_ANECDOTE_SUCCESS = 'CREATE_ANECDOTE_SUCCESS'
const CREATE_ANECDOTE = 'CREATE_ANECDOTE'
const INIT_ANECDOTE = 'INIT_ANECDOTE'
const INIT_ANECDOTE_SUCCESS = 'INIT_ANECDOTE_SUCCESS'
const VOTE_ANECDOTE = 'VOTE_ANECDOTE'
const VOTE_ANECDOTE_SUCCESS = 'VOTE_ANECDOTE_SUCCESS'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'


function* createAnecdote(action) {
  const anecdote = action.data.anecdote;
  const newAnecdote = yield call(anecdoteServices.create,{ ...anecdote, votes: 0 });
  yield put({type:CREATE_ANECDOTE_SUCCESS,anecdote:newAnecdote})
}

function* voteAnecdote(action) {
  const queryid = action.data.id
  const id = yield call(anecdoteServices.vote,queryid);
  yield put({type:VOTE_ANECDOTE_SUCCESS, id})
  yield delay(2000)
  yield put({type:REMOVE_NOTIFICATION})
}
function* initializeAnecdote() {
  const anecdotes = yield call(anecdoteServices.getAll);
  yield put({type:INIT_ANECDOTE_SUCCESS, anecdotes})
}

function* createAnecdoteWatcher() {
  yield takeEvery(CREATE_ANECDOTE, createAnecdote);
}

function* voteAnecdoteWatcher() {
  yield takeLatest(VOTE_ANECDOTE, voteAnecdote);
}
function* initializeAnecdoteWatcher() {
  yield takeEvery(INIT_ANECDOTE, initializeAnecdote);
}

export function* anecdotesWatcher() {
  yield all([
    voteAnecdoteWatcher(),
    initializeAnecdoteWatcher(),
    createAnecdoteWatcher()
  ])
}
