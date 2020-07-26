import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  load_user_from_local_storage,
  authToastSelector,
  authuserSelector,
  logout_user_begin,
} from "../../store/slices/auth";
import useToast from "../../Hooks/toast.hook";

const Navbar = () => {
  const dispatch = useDispatch();
  const authToast = useSelector(authToastSelector);
  const { icon, title } = authToast;
  const user = useSelector(authuserSelector);
  const Toast = useToast({});
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

  const handleLogout = (e) => {
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
            <a href="!#">Developers</a>
          </li>
          {user ? (
            <li>
              <a style={{ cursor: "pointer" }} onClick={handleLogout}>
                Logout
              </a>
            </li>
          ) : (
            <Fragment>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
