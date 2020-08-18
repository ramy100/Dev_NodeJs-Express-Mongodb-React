import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import Logger from "redux-logger";
import reducer from "./reducer";
import rootSage from "./rootSage";
// import api from "./middleware/api";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middleware.push(Logger);
  middleware.push(...getDefaultMiddleware());
}

if (process.env.NODE_ENV === "production") {
  middleware.push(
    ...getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    })
  );
}

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV === "development" ? true : false,
});

sagaMiddleware.run(rootSage);

export default store;
