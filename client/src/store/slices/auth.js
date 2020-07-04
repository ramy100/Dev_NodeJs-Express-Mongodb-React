import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api-call";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    loading: false,
    token: localStorage.getItem("token"),
    user: null,
  },
  reducers: {
    REGISTER_SUCCESS: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload.token;
      state.isLogged = true;
      state.loading = false;
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
    },
  },
});

export default authSlice.reducer;
export const {
  REGISTER_SUCCESS,
  LOADING_REQUEST,
  REGISTER_FAILED,
} = authSlice.actions;

export const registerUser = (newUser) => (dispatch, getState) => {
  dispatch(LOADING_REQUEST({}));
  dispatch(
    apiCallBegan({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: "/users",
      data: newUser,
      onSuccess: REGISTER_SUCCESS.type,
      onFail: REGISTER_FAILED.type,
      displayRegisterErrors: true,
    })
  );
};
