import { createSlice, createAction } from "@reduxjs/toolkit";
import { takeLeading, all, put } from "redux-saga/effects";
import {
  requestGetUserProfile,
  requestCreateOrUpdateUserProfile,
} from "../api/api";
import { setFormErrors, clearPrompts, setPopUp, redirectTo } from "./prompts";
const myProfileInitialState = { social: {}, skills: [] };
const initialState = {
  myprofile: myProfileInitialState,
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
      state.myprofile = { ...state.myprofile, ...action.payload };
    },
    CLEAR_PROFILE: (state, action) => ({
      ...state,
      myprofile: myProfileInitialState,
      loading: false,
    }),
  },
});

export default profileSlice.reducer;

const {
  LOAD_PROFILE_SUCCESS,
  LOADING_PROFILE,
  CLEAR_PROFILE,
} = profileSlice.actions;

// profile sagas
function* getUserProfile(action) {
  try {
    yield put(LOADING_PROFILE());
    const res = yield requestGetUserProfile(action.payload);
    const userProfile = yield res.data;
    yield put(LOAD_PROFILE_SUCCESS(userProfile));
  } catch (error) {
    const { msg } = yield error.response.data;
    yield put(CLEAR_PROFILE());
    yield put(setPopUp("info", msg));
  }
}

function* createOrUpdateProfile({ payload: { token, formData } }) {
  try {
    yield put(clearPrompts());
    yield put(LOADING_PROFILE());
    const res = yield requestCreateOrUpdateUserProfile(token, formData);
    const UserProfile = yield res.data;
    yield put(LOAD_PROFILE_SUCCESS(UserProfile));
    yield put(setPopUp("success", "Profile Saved Successfully"));
    yield put(redirectTo("/dashboard"));
  } catch (error) {
    const { errorMessages } = yield error.response.data;
    yield put(CLEAR_PROFILE());
    yield put(setFormErrors(errorMessages));
  }
}

export function* watchProfileAsync() {
  yield all([
    takeLeading(getProfileCallBegin.type, getUserProfile),
    takeLeading(createOrUpdateProfileCallBegin.type, createOrUpdateProfile),
  ]);
}

// profile actions
export const getProfileCallBegin = createAction(
  "profile/GET_USER_PROFILE_CALL_BEGIN"
);
export const createOrUpdateProfileCallBegin = createAction(
  "profile/CREATE_OR_UPDATE_USER_PROFILE_CALL_BEGIN"
);

// profile selectors
export const profileSelector = (state) => state.profile.myprofile;
export const profileLoadingSelector = (state) => state.profile.loading;

export const clearProfile = () => (dispatch) => dispatch(CLEAR_PROFILE());
