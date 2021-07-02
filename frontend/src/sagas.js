import { all } from "@redux-saga/core/effects";
import { anecdotesWatcher } from "./sagas/anecdotesSaga";

export default function* rootSaga() {
  yield all([anecdotesWatcher()]);
}
