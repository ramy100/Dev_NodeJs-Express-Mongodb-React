import { createSlice, createAction, createSelector } from "@reduxjs/toolkit";
import { takeLeading, all, put } from "redux-saga/effects";
import { requestGetUserProfile } from "../api/api";
import { STATES } from "mongoose";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: false,
  message: { icon: "", title: "" },
};

const profileSlice = createSlice({
  initialState,
  name: "profile",
  reducers: {
    LOADING_PROFILE: (state, action) => {
      state.loading = true;
    },
    SAVE_PROFILE: (state, action) => {
      console.log(action.payload);
      state.loading = false;
    },
    SEND_PROFILE_MESSAGE: (state, { payload: { title, icon } }) => {
      state.message.title = title;
      state.message.icon = icon;
      state.loading = false;
    },
  },
});

export default profileSlice.reducer;

const {
  SAVE_PROFILE,
  SEND_PROFILE_MESSAGE,
  LOADING_PROFILE,
} = profileSlice.actions;

// profile sagas
function* getUserProfile(action) {
  try {
    yield put(LOADING_PROFILE());
    const res = yield requestGetUserProfile(action.payload);
    const userProfile = yield res.profile;
    yield put(SAVE_PROFILE(userProfile));
  } catch (error) {
    const { msg } = error.response.data;
    yield put(SEND_PROFILE_MESSAGE({ title: msg, icon: "error" }));
  }
}

export function* watchProfileAsync() {
  yield all([takeLeading(getProfileCallBegin.type, getUserProfile)]);
}

// profile actions
export const getProfileCallBegin = createAction(
  "profile/GET_USER_PROFILE_CALL_BEGIN"
);

// profile selectors
export const profileMessageSelector = (state) => state.profile.message;
