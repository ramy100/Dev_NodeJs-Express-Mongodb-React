import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authuserSelector } from "../../store/slices/auth";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(authuserSelector);
  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                redirectMessage: {
                  icon: "error",
                  title: "You are not logged in!",
                },
              },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    ></Route>
  );
};

export default ProtectedRoute;
