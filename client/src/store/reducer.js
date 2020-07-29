import { combineReducers } from "@reduxjs/toolkit";
import entities from "./slices/entities";
import auth from "./slices/auth";
import profile from "./slices/profile";
export default combineReducers({
  entities,
  auth,
  profile,
});
