import { createSlice, createAction } from "@reduxjs/toolkit";
import { takeLeading, all, put } from "redux-saga/effects";
import { requestGetUserProfile } from "../api/api";
import { showErrorPopup } from "./popUps";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: false,
};

const profileSlice = createSlice({
  initialState,
  name: "profile",
  reducers: {
    LOADING_PROFILE: (state, action) => {
      state.loading = true;
    },
    LOAD_PROFILE_SUCCESS: (state, action) => {
      state.loading = false;
    },
  },
});

export default profileSlice.reducer;

const { LOAD_PROFILE_SUCCESS, LOADING_PROFILE } = profileSlice.actions;

// profile sagas
function* getUserProfile(action) {
  try {
    yield put(LOADING_PROFILE());
    const res = yield requestGetUserProfile(action.payload);
    const userProfile = yield res.profile;
    yield put(LOAD_PROFILE_SUCCESS(userProfile));
  } catch (error) {
    const { msg } = error.response.data;
    yield put(showErrorPopup(msg));
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
