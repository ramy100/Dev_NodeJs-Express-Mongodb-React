import { all, call } from "redux-saga/effects";
import { watchAuthAsync } from "./slices/auth";

export default function* () {
  yield all([call(watchAuthAsync)]);
}
