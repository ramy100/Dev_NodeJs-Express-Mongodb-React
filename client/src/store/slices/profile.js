import { createSlice, createAction } from "@reduxjs/toolkit";
import { takeLeading, all, put } from "redux-saga/effects";
import {
  requestGetUserProfile,
  requestCreateOrUpdateUserProfile,
} from "../api/api";
import { showErrorPopup, showSuccessPopup } from "./popUps";

const initialState = {
  myprofile: { social: {}, skills: [] },
  profiles: [],
  repos: [],
  loading: false,
  profileErrors: {},
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
    SET_PROFILE_ERRORS: (state, action) => {
      state.profileErrors = action.payload;
    },
    CLEAR_PROFILE_ERRORS: (state, action) => {
      state.profileErrors = {};
    },
  },
});

export default profileSlice.reducer;

const {
  LOAD_PROFILE_SUCCESS,
  LOADING_PROFILE,
  SET_PROFILE_ERRORS,
  CLEAR_PROFILE_ERRORS,
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
    yield put(showErrorPopup(msg));
  }
}

function* createOrUpdateProfile({ payload: { token, formData } }) {
  try {
    yield put(CLEAR_PROFILE_ERRORS());
    const res = yield requestCreateOrUpdateUserProfile(token, formData);
    const UserProfile = yield res.data;
    yield put(LOAD_PROFILE_SUCCESS(UserProfile));
    yield put(showSuccessPopup("Profile Saved Successfully"));
  } catch (error) {
    const { errorMessages } = yield error.response.data;
    yield put(SET_PROFILE_ERRORS(errorMessages));
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
export const profileMessageSelector = (state) => state.profile.message;
export const profileErrorsSelector = (state) => state.profile.profileErrors;

//profile action callers
export const clearProfileErrors = () => (dispatch) => {
  dispatch(CLEAR_PROFILE_ERRORS());
};
