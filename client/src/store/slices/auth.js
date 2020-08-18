import { createSlice, createAction } from "@reduxjs/toolkit";
import { put, call, takeLeading, all } from "redux-saga/effects";
import {
  requestRegisterUserApi,
  requestLoginUserApi,
  requestGetUserApi,
} from "../api/AuthApi";
import { setFormErrors, setPopUp } from "./prompts";
import { clearProfile } from "./profile";

const initialState = {
  isLogged: false,
  loading: false,
  token: localStorage.getItem("token"),
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN_USER: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLogged = true;
      state.loading = false;
    },
    AUTH_LOADING: (state, action) => {
      state.loading = true;
    },
    AUTH_FAILED: (state, action) => {
      state.token = null;
      state.loading = false;
      state.isLogged = false;
      state.user = null;
    },
    LOGOUT_USER: (state, action) => initialState,
  },
});

export default authSlice.reducer;
const {
  LOGIN_USER,
  AUTH_LOADING,
  AUTH_FAILED,
  LOGOUT_USER,
} = authSlice.actions;

// auth sagas
function* registerBeginAsync(action) {
  yield put(AUTH_LOADING());
  try {
    const res = yield call(requestRegisterUserApi, action.payload);
    const token = yield res.data.token;
    const { data: user } = yield call(requestGetUserApi, token);
    yield put(LOGIN_USER({ token, user }));
    yield put(setPopUp("success", `Welcome ${user.name} !`));
  } catch (err) {
    const errors = err.response ? err.response.data.errorMessages : {};
    yield put(AUTH_FAILED());
    yield put(setFormErrors(errors));
  }
}

function* loginBeginAsync(action) {
  yield put(AUTH_LOADING());
  try {
    const res = yield call(requestLoginUserApi, action.payload);
    const token = yield res.data.token;
    const { data: user } = yield call(requestGetUserApi, token);
    yield put(LOGIN_USER({ token, user }));
    yield put(setPopUp("success", `Welcome ${user.name} !`));
  } catch (err) {
    const errors = err.response ? err.response.data.errorMessages : {};
    yield put(AUTH_FAILED(errors));
    yield localStorage.removeItem("token");
    yield put(setFormErrors(errors));
  }
}

function* logoutBeginAsync(action) {
  yield put(AUTH_LOADING());
  yield put(LOGOUT_USER());
  yield put(clearProfile());
  yield put(setPopUp("info", `Logged Out !`));
  yield localStorage.removeItem("token");
}

function* loadUserAsync(action) {
  yield put(AUTH_LOADING());
  try {
    const token = yield action.payload;
    const { data: user } = yield call(requestGetUserApi, token);
    yield put(LOGIN_USER({ token, user }));
    yield put(setPopUp("success", `Welcome ${user.name} !`));
  } catch (err) {
    //nothing to display here
    // yield console.log(err.response);
  }
}

export function* watchAuthAsync() {
  yield all([
    takeLeading(register_user_begin.type, registerBeginAsync),
    takeLeading(login_user_begin.type, loginBeginAsync),
    takeLeading(logout_user_begin.type, logoutBeginAsync),
    takeLeading(load_user_from_local_storage.type, loadUserAsync),
  ]);
}

// auth actions
export const register_user_begin = createAction("auth/REGISTER_BEGIN_ASYNC");
export const login_user_begin = createAction("auth/LOGIN_BEGIN_ASYNC");
export const logout_user_begin = createAction("auth/LOGOUT_BEGIN_ASYNC");
export const load_user_from_local_storage = createAction(
  "auth/LOAD_USER_FROM_LOCAL_STORAGE"
);

//auth selectors
export const authuserSelector = (state) => state.auth.user;
export const authTokenSelector = (state) => state.auth.token;
export const authLoadingSelector = (state) => state.auth.loading;
