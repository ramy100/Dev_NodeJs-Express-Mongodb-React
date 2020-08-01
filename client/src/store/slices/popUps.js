import { createSlice } from "@reduxjs/toolkit";

const initialState = { icon: "", title: "" };
const PopUp = createSlice({
  name: "popup",
  initialState,
  reducers: {
    SET_POPUP: (state, action) => ({ ...state, ...action.payload }),
    CLEAR_POPUP: (state, action) => initialState,
  },
});

export default PopUp.reducer;
const { SET_POPUP, CLEAR_POPUP } = PopUp.actions;

export const showSuccessPopup = (message) => (dispatch) =>
  dispatch(SET_POPUP({ icon: "success", title: `${message}` }));

export const showErrorPopup = (message) => (dispatch) =>
  dispatch(SET_POPUP({ icon: "error", title: `${message}` }));

export const showLoginSuccessPopup = (userName) => (dispatch) =>
  dispatch(SET_POPUP({ icon: "success", title: `Welcome ${userName}` }));

export const showLogoutPopup = () => (dispatch) =>
  dispatch(SET_POPUP({ icon: "info", title: `Logged Out` }));

export const popUpSelector = (state) => state.entities.popUp;
