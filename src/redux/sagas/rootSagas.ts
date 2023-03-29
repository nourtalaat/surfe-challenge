import { all } from "redux-saga/effects";
import notesSaga from "./notes";
import usersSaga from "./users";

export default function* rootSaga() {
  yield all([notesSaga(), usersSaga()]);
}
