import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import Logger from "redux-logger";
import reducer from "./reducer";
import rootSage from "./rootSage";
// import api from "./middleware/api";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), Logger, sagaMiddleware],
});

sagaMiddleware.run(rootSage);

export default store;
