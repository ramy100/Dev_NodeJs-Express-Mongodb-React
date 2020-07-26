import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./Navbar";
import Landing from "./Landing";
import Alert from "./Alert";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { useSelector } from "react-redux";
import { authuserSelector } from "../../store/slices/auth";
const MainPage = () => {
  const user = useSelector(authuserSelector);
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route
              exact
              path="/Login"
              render={() => (user ? <Redirect to="/" /> : <Login />)}
            />
            <Route
              exact
              path="/register"
              render={() => (user ? <Redirect to="/" /> : <Register />)}
            />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default MainPage;
