import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { authuserSelector } from "../../store/slices/auth";

const GuestRoutes = ({ component: Component, ...rest }) => {
  const user = useSelector(authuserSelector);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    ></Route>
  );
};

export default GuestRoutes;
