import { createSlice, createAction, current } from "@reduxjs/toolkit";
import { takeLeading, all, put } from "redux-saga/effects";
import { setFormErrors, clearPrompts, setPopUp, redirectTo } from "./prompts";
import {
  requestCreatePost,
  requestGetAllPosts,
  requestLikePostById,
  requestUnLikePostById,
} from "../api/PostsApi";
import { STATES } from "mongoose";
const initialState = {
  posts: [],
  loading: false,
  currentpage: 0,
  isLastPage: false,
  addedPosts: 0,
  openCreatePostModal: false,
};

const postsSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    REQUEST_LAODING: (state, action) => {
      state.loading = true;
    },
    CREATE_POST_SUCCESS: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.loading = false;
      state.addedPosts++;
      state.openCreatePostModal = false;
    },
    REQUEST_FAILED: (state, action) => {
      state.loading = false;
    },
    GET_POSTS_SUCCESS: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
      state.loading = false;
      state.currentpage = state.currentpage + 1;
    },
    NO_MORE_POSTS: (state, action) => {
      state.isLastPage = true;
      state.loading = false;
    },
    CLOSE_CREATE_MODAL: (state, action) => {
      state.openCreatePostModal = false;
    },
    OPEN_CREATE_MODAL: (state, action) => {
      state.openCreatePostModal = true;
    },
    LIKE_POST_SUCCESSL: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    UNLIKE_POST_SUCCESSL: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
  },
});

export default postsSlice.reducer;

const {
  CREATE_POST_SUCCESS,
  REQUEST_LAODING,
  REQUEST_FAILED,
  GET_POSTS_SUCCESS,
  NO_MORE_POSTS,
  OPEN_CREATE_MODAL,
  CLOSE_CREATE_MODAL,
  LIKE_POST_SUCCESSL,
  UNLIKE_POST_SUCCESSL,
} = postsSlice.actions;

// posts sagas

function* createPostAsync({ payload: { token, text } }) {
  try {
    yield put(REQUEST_LAODING());
    const res = yield requestCreatePost(token, { text });
    yield put(CREATE_POST_SUCCESS(res.data));
    yield put(setPopUp("success", "Post Created Successfully !"));
    yield put(clearPrompts());
  } catch (error) {
    const { errorMessages } = yield error.response.data;
    yield put(setFormErrors(errorMessages));
    yield put(REQUEST_FAILED());
  }
}

function* getPostsAsync({ payload: { token, pageNum, addedPosts } }) {
  try {
    yield put(REQUEST_LAODING());
    const res = yield requestGetAllPosts(token, pageNum, addedPosts);
    yield res.data.length == 0
      ? yield put(NO_MORE_POSTS())
      : yield put(GET_POSTS_SUCCESS(res.data));
  } catch (error) {
    yield put(setPopUp("info", "Failed Loading New Posts!"));
    yield put(REQUEST_FAILED());
  }
}

function* likePostAsync({ payload: { token, postId } }) {
  try {
    const res = yield requestLikePostById(token, postId);
    yield put(LIKE_POST_SUCCESSL(res.data));
  } catch (error) {
    yield put(setPopUp("info", error.response.data.msg));
  }
}

function* unLikePostAsync({ payload: { token, postId } }) {
  try {
    const res = yield requestUnLikePostById(token, postId);
    yield put(UNLIKE_POST_SUCCESSL(res.data));
  } catch (error) {
    yield put(setPopUp("info", error.response.data.msg));
  }
}

export function* watchPostsAsync() {
  yield all([takeLeading(createPostCallBegin.type, createPostAsync)]);
  yield all([takeLeading(getPostsCallBegin.type, getPostsAsync)]);
  yield all([takeLeading(likePostCallBegin.type, likePostAsync)]);
  yield all([takeLeading(unLikePostCallBegin.type, unLikePostAsync)]);
}

// posts actions
export const createPostCallBegin = createAction("posts/CREATE_POST_CALL_BEGIN");
export const getPostsCallBegin = createAction("posts/GET_POSTS_CALL_BEGIN");
export const likePostCallBegin = createAction("posts/LIKE_POST_CALL_BEGIN");
export const unLikePostCallBegin = createAction("posts/UNLIKE_POST_CALL_BEGIN");

//export action callers
export const closeModal = () => (dispatch) => dispatch(CLOSE_CREATE_MODAL());
export const openModal = () => (dispatch) => dispatch(OPEN_CREATE_MODAL());

// posts selectors
export const postsLoadingSelector = (state) => state.posts.loading;
export const postsCurrentPageSelector = (state) => state.posts.currentpage;
export const postsSelector = (state) => state.posts.posts;
export const isLastPageSelector = (state) => state.posts.isLastPage;
export const AddedPostsSelector = (state) => state.posts.addedPosts;
export const openCreatePostModalSelector = (state) =>
  state.posts.openCreatePostModal;

// export const profileSelector = (state) => state.profile.myprofile;
