import { createSlice, createAction } from "@reduxjs/toolkit";
import { takeLeading, all, put, call, takeLatest } from "redux-saga/effects";
import {
  requestGetUserProfile,
  requestCreateOrUpdateUserProfile,
  requestPutUserProfileExperience,
  requestPutUserProfileEducation,
  requestDeleteUserProfileEducation,
  requestDeleteUserProfileExperience,
  requestGetAllUsersProfile,
} from "../api/AuthApi";
import { setFormErrors, clearPrompts, setPopUp, redirectTo } from "./prompts";
const myProfileInitialState = {
  social: {},
  skills: [],
};
const initialState = {
  myprofile: myProfileInitialState,
  profiles: {},
  profilesPages: 0,
  currentPage: 0,
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
    REQUEST_FAILED: (state, action) => {
      state.loading = false;
    },
    LOAD_PROFILE_SUCCESS: (state, action) => {
      state.loading = false;
      state.myprofile = { ...state.myprofile, ...action.payload };
    },
    LOAD_ALL_PROFILES_SUCCESS: (state, action) => {
      state.loading = false;
      state.profiles[action.payload.currentPage] = action.payload.allProfiles;
      state.profilesPages = action.payload.pages;
    },
    CLEAR_PROFILE: (state, action) => ({
      ...state,
      myprofile: myProfileInitialState,
      loading: false,
    }),
    DELETE_EDUCATION_SUCCESS: (state, action) => {
      state.myprofile.education = state.myprofile.education.filter(
        (edu) => edu._id !== action.payload
      );
      state.loading = false;
    },
    DELETE_EXPERIENCE_SUCCESS: (state, action) => {
      state.myprofile.experience = state.myprofile.experience.filter(
        (exp) => exp._id !== action.payload
      );
      state.loading = false;
    },
    CHANGE_PROFILE_CURRENT_PAGE: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export default profileSlice.reducer;

const {
  LOAD_PROFILE_SUCCESS,
  LOADING_PROFILE,
  CLEAR_PROFILE,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EXPERIENCE_SUCCESS,
  REQUEST_FAILED,
  LOAD_ALL_PROFILES_SUCCESS,
  CHANGE_PROFILE_CURRENT_PAGE,
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

function* getAllProfiles({ payload }) {
  try {
    yield put(LOADING_PROFILE());
    const res = yield requestGetAllUsersProfile(payload);
    const allProfiles = yield res.data.profiles;
    const pages = yield res.data.pages;
    yield put(
      LOAD_ALL_PROFILES_SUCCESS({ allProfiles, pages, currentPage: payload })
    );
  } catch (error) {
    put(REQUEST_FAILED());
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

function* addExperienceAsync({ payload: { token, formData } }) {
  try {
    yield put(LOADING_PROFILE());
    const res = yield call(requestPutUserProfileExperience, token, formData);
    const UserProfile = yield res.data;
    yield put(LOAD_PROFILE_SUCCESS(UserProfile));
    yield put(setPopUp("success", "Experience Added Successfully"));
    yield put(redirectTo("/dashboard"));
  } catch (error) {
    const { errorMessages } = yield error.response.data;
    yield put(CLEAR_PROFILE());
    yield put(setFormErrors(errorMessages));
  }
}

function* addEducationAsync({ payload: { token, formData } }) {
  try {
    yield put(LOADING_PROFILE());
    const res = yield call(requestPutUserProfileEducation, token, formData);
    const UserProfile = yield res.data;
    yield put(LOAD_PROFILE_SUCCESS(UserProfile));
    yield put(setPopUp("success", "Education Added Successfully"));
    yield put(redirectTo("/dashboard"));
  } catch (error) {
    const { errorMessages } = yield error.response.data;
    yield put(CLEAR_PROFILE());
    yield put(setFormErrors(errorMessages));
  }
}

function* deleteEducationAsync({ payload: { token, eduId } }) {
  try {
    yield put(LOADING_PROFILE());
    yield requestDeleteUserProfileEducation(token, eduId);
    yield put(DELETE_EDUCATION_SUCCESS(eduId));
  } catch (error) {
    yield put(REQUEST_FAILED());
    yield put(setPopUp("error", "Couldn't Delete Education!"));
  }
}
function* deleteExperienceAsync({ payload: { token, expId } }) {
  try {
    yield put(LOADING_PROFILE());
    yield requestDeleteUserProfileExperience(token, expId);
    yield put(DELETE_EXPERIENCE_SUCCESS(expId));
  } catch (error) {
    yield put(REQUEST_FAILED());
    yield put(setPopUp("error", "Couldn't Delete Experience!"));
    // yield console.log(error.response);
  }
}

export function* watchProfileAsync() {
  yield all([
    takeLeading(getProfileCallBegin.type, getUserProfile),
    takeLatest(getAllProfilesCallBegin.type, getAllProfiles),
    takeLeading(createOrUpdateProfileCallBegin.type, createOrUpdateProfile),
    takeLeading(addExperienceCallBegin.type, addExperienceAsync),
    takeLeading(addEducationCallBegin.type, addEducationAsync),
    takeLeading(deleteEducationCallBegin.type, deleteEducationAsync),
    takeLeading(deleteExperienceCallBegin.type, deleteExperienceAsync),
  ]);
}

// profile actions
export const getProfileCallBegin = createAction(
  "profile/GET_USER_PROFILE_CALL_BEGIN"
);
export const getAllProfilesCallBegin = createAction(
  "profile/GET_All_PROFILES_CALL_BEGIN"
);
export const createOrUpdateProfileCallBegin = createAction(
  "profile/CREATE_OR_UPDATE_USER_PROFILE_CALL_BEGIN"
);
export const addExperienceCallBegin = createAction(
  "profile/ADD_EXPERIENCE_CALL_BEGIN"
);
export const addEducationCallBegin = createAction(
  "profile/ADD_EDUCATION_CALL_BEGIN"
);
export const deleteEducationCallBegin = createAction(
  "profile/DELETE_EDUCATION_CALL_BEGIN"
);
export const deleteExperienceCallBegin = createAction(
  "profile/DELETE_EXPERIENCE_CALL_BEGIN"
);

// profile selectors
export const profileSelector = (state) => state.profile.myprofile;
export const AllProfilesSelector = (state) => state.profile.profiles;
export const ProfilesPagesCountSelector = (state) =>
  state.profile.profilesPages;
export const ProfileCurrentPageSelector = (state) => state.profile.currentPage;
export const profileLoadingSelector = (state) => state.profile.loading;

export const clearProfile = () => (dispatch) => dispatch(CLEAR_PROFILE());
export const changeProfileCurrentPage = (pageNum) => (dispatch) =>
  dispatch(CHANGE_PROFILE_CURRENT_PAGE(pageNum));
