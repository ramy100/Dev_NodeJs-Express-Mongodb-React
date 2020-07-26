import { createSlice, createAction } from "@reduxjs/toolkit";
import { put, call, takeLeading, all } from "redux-saga/effects";
import {
  requestRegisterUserApi,
  requestLoginUserApi,
  requestGetUserApi,
} from "../api/api";
import swal from "sweetalert";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    loading: false,
    token: localStorage.getItem("token"),
    user: null,
    AuthErrors: {},
  },
  reducers: {
    LOGIN_USER: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLogged = true;
      state.loading = false;
      state.AuthErrors = {};
    },
    AUTH_LOADING: (state, action) => {
      state.loading = true;
    },
    AUTH_FAILED: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.loading = false;
      state.isLogged = false;
      state.user = null;
      state.AuthErrors = action.payload;
    },
    CLEAR_REGISTER_ERRORS: (state, action) => {
      state.AuthErrors = {};
    },
  },
});

export default authSlice.reducer;
const {
  LOGIN_USER,
  AUTH_LOADING,
  AUTH_FAILED,
  CLEAR_REGISTER_ERRORS,
} = authSlice.actions;

// auth sagas
function* registerBeginAsync(action) {
  yield put(AUTH_LOADING());
  try {
    const res = yield call(requestRegisterUserApi, action.payload);
    const token = yield res.data.token;
    const { data: user } = yield call(requestGetUserApi, token);
    yield put(LOGIN_USER({ token, user }));
    yield swal(
      "Regiteration Success!",
      `Welcome ${user.name} \n you are now logged in!`,
      "success"
    );
  } catch (err) {
    yield put(AUTH_FAILED(err.response.data.errorMessages));
  }
}

function* loginBeginAsync(action) {
  yield put(AUTH_LOADING());
  try {
    const res = yield call(requestLoginUserApi, action.payload);
    const token = yield res.data.token;
    const { data: user } = yield call(requestGetUserApi, token);
    yield put(LOGIN_USER({ token, user }));
    yield swal(
      "Login Success!",
      `Welcome ${user.name} \n you are now logged in!`,
      "success"
    );
  } catch (err) {
    yield put(AUTH_FAILED(err.response.data.errorMessages));
  }
}

export function* watchAuthAsync() {
  yield all([
    takeLeading(register_user_begin.type, registerBeginAsync),
    takeLeading(login_user_begin.type, loginBeginAsync),
  ]);
}

// auth actions
export const register_user_begin = createAction("auth/REGISTER_BEGIN_ASYNC");
export const login_user_begin = createAction("auth/LOGIN_BEGIN_ASYNC");

//auth selectors
export const authuserSelector = (state) => state.auth.user;
export const authErrorsSelector = (state) => state.auth.AuthErrors;
export const authLoadingSelector = (state) => state.auth.loading;

//action export
export const clearAuthErrors = CLEAR_REGISTER_ERRORS;
