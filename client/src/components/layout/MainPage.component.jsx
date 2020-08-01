import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Landing.component";
import Login from "../auth/Login/Login.component";
import Register from "../auth/register/register.component";
import GuestRoutes from "../routes/GuestRoutes.component";
import ProtectedRoute from "../routes/ProtectedRoutes.component";
import DashBoard from "../dashboard/dashboard.component";
import { useSelector, useDispatch } from "react-redux";
import { load_user_from_local_storage } from "../../store/slices/auth";
import usePopUp from "../../Hooks/PopUp.hook";
import { Media } from "../../media";
import DesktopNavBar from "../NavBar/DesktopNavBar.component";
import MobileNavBar from "../NavBar/MobileNavBar.component";
import { Sidebar, Segment } from "semantic-ui-react";
import Footer from "../Footer/Footer.component";
import { popUpSelector } from "../../store/slices/popUps";

const MainPage = () => {
  const dispatch = useDispatch();
  const popUp = useSelector(popUpSelector);
  const { icon, title } = popUp;
  const Toast = usePopUp({ toast: true });

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
  }, [popUp]);

  return (
    <Fragment>
      <Router>
        <Segment inverted textAlign="center" vertical>
          <Media greaterThanOrEqual="tablet">
            <DesktopNavBar />
          </Media>
          <Media as={Sidebar.Pushable} at="mobile">
            <MobileNavBar />
          </Media>
        </Segment>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Fragment>
                <Media greaterThanOrEqual="tablet">
                  <Landing />
                </Media>
                <Media at="mobile">
                  <Landing mobile />
                </Media>
              </Fragment>
            )}
          />
          <GuestRoutes exact path="/Login" component={Login} />
          <GuestRoutes exact path="/register" component={Register} />
          <ProtectedRoute exact path="/dashboard" component={DashBoard} />
        </Switch>
        <Footer />
      </Router>
    </Fragment>
  );
};

export default MainPage;
