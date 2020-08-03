import { createSlice } from "@reduxjs/toolkit";
const initialState = { formErrors: "", popup: "", redirectLink: "" };
const prompts = createSlice({
  name: "prompts",
  initialState,
  reducers: {
    SET_FORM_ERRORS: (state, action) => {
      state.formErrors = action.payload;
    },
    SET_POPUP: (state, action) => {
      state.popup = action.payload;
    },
    SET_REDIRECT: (state, action) => {
      state.redirectLink = action.payload;
    },
    CLEAR_PROMPTS: (state, action) => initialState,
  },
});

export default prompts.reducer;
const {
  CLEAR_PROMPTS,
  SET_FORM_ERRORS,
  SET_POPUP,
  SET_REDIRECT,
} = prompts.actions;

export const setFormErrors = (errors) => (dispatch) =>
  dispatch(SET_FORM_ERRORS(errors));
export const setPopUp = (icon, title, popupConfig = {}) => (dispatch) =>
  dispatch(SET_POPUP({ icon, title, popupConfig }));
export const clearPrompts = () => (dispatch) => dispatch(CLEAR_PROMPTS());
export const redirectTo = (url) => (dispatch) => dispatch(SET_REDIRECT(url));

export const formErrorsSelector = (state) => state.entities.prompts.formErrors;
export const PopupSelector = (state) => state.entities.prompts.popup;
export const redirectSelector = (state) => state.entities.prompts.redirectLink;
