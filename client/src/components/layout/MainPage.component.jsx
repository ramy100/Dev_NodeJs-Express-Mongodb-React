import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Landing from "./Landing";
import Alert from "./Alert";
import Login from "../auth/Login";
import Register from "../auth/Register";
import GuestRoutes from "../routes/GuestRoutes.component";
import ProtectedRoute from "../routes/ProtectedRoutes.component";
import DashBoard from "../dashboard/dashboard.component";
import { useSelector, useDispatch } from "react-redux";
import {
  authToastSelector,
  load_user_from_local_storage,
} from "../../store/slices/auth";
import useToast from "../../Hooks/toast.hook";

const MainPage = () => {
  const dispatch = useDispatch();
  const authToast = useSelector(authToastSelector);
  const { icon, title } = authToast;
  const Toast = useToast({ position: "top" });
  useEffect(() => {
    const token = localStorage.token;
    if (token) {
      dispatch(load_user_from_local_storage(token));
    }
  }, []);

  useEffect(() => {
    if (title && icon) {
      Toast.fire({
        icon,
        title,
      });
    }
  }, [authToast]);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <GuestRoutes exact path="/Login" component={Login} />
            <GuestRoutes exact path="/register" component={Register} />
            <ProtectedRoute exact path="/dashboard" component={DashBoard} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default MainPage;
