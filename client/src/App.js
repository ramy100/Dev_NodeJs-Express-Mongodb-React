import React from "react";
import MainPage from "./components/layout/MainPage.component";
import "./App.css";
// Redux
import { Provider } from "react-redux";
import store from "./store/configurestore";
import { MediaContextProvider } from "./media";

const App = () => (
  <MediaContextProvider>
    <Provider store={store}>
      <MainPage />
    </Provider>
  </MediaContextProvider>
);

export default App;
