import { createSlice, createAction } from "@reduxjs/toolkit";
import { put, call, takeLeading } from "redux-saga/effects";
import { requestRegisterUserApi } from "../api/api";
import swal from "sweetalert";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    loading: false,
    token: localStorage.getItem("token"),
    user: null,
    error: null,
  },
  reducers: {
    REGISTER_SUCCESS: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLogged = true;
      state.loading = false;
      state.error = null;
    },
    LOADING_REQUEST: (state, action) => {
      state.loading = true;
    },
    REGISTER_FAILED: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.loading = false;
      state.isLogged = false;
      state.user = null;
      state.error = action.payload.error;
    },
  },
});

export default authSlice.reducer;
const {
  REGISTER_SUCCESS,
  LOADING_REQUEST,
  REGISTER_FAILED,
} = authSlice.actions;

// auth sagas
function* registerBeginAsync(action) {
  yield put(LOADING_REQUEST());
  try {
    const res = yield call(requestRegisterUserApi, action.payload);
    const token = yield res.data.token;
    const user = yield res.data.user;
    yield put(REGISTER_SUCCESS({ token, user }));
    yield swal(
      "Regiteration Success!",
      `Welcome ${user.name} \n you are now logged in!`,
      "success"
    );
  } catch (err) {
    yield put(REGISTER_FAILED({ error: err.response.data.msg }));
    yield swal("registration failed!", err.response.data.msg, "error");
  }
}

export function* watchAuthAsync() {
  yield takeLeading(register_user_begin.type, registerBeginAsync);
}

// auth actions
export const register_user_begin = createAction("REGISTER_BEGIN_ASYNC");

//auth selectors
export const authuserSelector = (state) => state.auth.user;
