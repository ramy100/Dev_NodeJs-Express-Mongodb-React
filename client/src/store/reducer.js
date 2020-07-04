import { combineReducers } from "@reduxjs/toolkit";
import entities from "./slices/entities";
import auth from "./slices/auth";
export default combineReducers({
  entities,
  auth,
});
