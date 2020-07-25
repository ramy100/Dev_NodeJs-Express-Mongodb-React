import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const alertSlice = createSlice({
  name: "alerts",
  initialState: [],
  reducers: {
    SET_ALERT: (state, action) => {
      state.push(action.payload);
    },
    REMOVE_ALERT: (state, action) => {},
    CLEAR_ALERT: (state, action) => {
      return [];
    },
  },
});
export default alertSlice.reducer;
export const selectAlerts = (state) => state.entities.alerts;
const { SET_ALERT, CLEAR_ALERT } = alertSlice.actions;

export const alertSet = (msg, alertType) =>
  SET_ALERT({
    id: uuidv4(),
    msg,
    alertType,
  });
export const alertsClear = () => CLEAR_ALERT();
