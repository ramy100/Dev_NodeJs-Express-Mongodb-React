import { all, call } from "redux-saga/effects";
import { watchAuthAsync } from "./slices/auth";
import { watchProfileAsync } from "./slices/profile";
import { watchPostsAsync } from "./slices/posts";

export default function* () {
  yield all([
    call(watchAuthAsync),
    call(watchProfileAsync),
    call(watchPostsAsync),
  ]);
}
