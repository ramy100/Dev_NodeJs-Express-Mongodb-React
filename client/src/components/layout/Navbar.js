import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import { authuserSelector, logout_user_begin } from "../../store/slices/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(authuserSelector);

  const handleLogout = () => {
    dispatch(logout_user_begin());
  };

  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> DevConnector
          </Link>
        </h1>
        <ul>
          <li>
            <Link to="/dashboard">DashBoard</Link>
          </li>
          {user ? (
            <li>
              <div className="logoutButton" onClick={handleLogout}>
                <Icon name="log out" />
                Logout
              </div>
            </li>
          ) : (
            <Fragment>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">
                  <Icon name="user" /> Login
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
