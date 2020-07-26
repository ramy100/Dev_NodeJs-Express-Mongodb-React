import React from "react";
import MainPage from "./components/layout/MainPage.component";
import "./App.css";
// Redux
import { Provider } from "react-redux";
import store from "./store/configurestore";

const App = () => (
  <Provider store={store}>
    <MainPage />
  </Provider>
);

export default App;
