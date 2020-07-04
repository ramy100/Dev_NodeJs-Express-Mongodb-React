import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api-call";

const authSlice = createSlice({
  name: "auth",
  initialState: [],
  reducers: {},
});

export default authSlice.reducer;
// export const {} = authSlice.actions;

export const registerUser = (newUser) =>
  apiCallBegan({
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: "/users",
    data: newUser,
  });
