import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authuserSelector, logout_user_begin } from "../../store/slices/auth";
import { Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NavBarRightLinks = ({ fixed = false }) => {
  const dispatch = useDispatch();
  const user = useSelector(authuserSelector);
  return !user ? (
    <Fragment>
      <Button as={Link} to="/login" inverted={!fixed}>
        <Icon name="user" />
        Log in
      </Button>
      <Button
        as={Link}
        to="/register"
        color="vk"
        style={{ marginLeft: "0.5em" }}
      >
        Sign Up
      </Button>
    </Fragment>
  ) : (
    <Button
      onClick={() => dispatch(logout_user_begin())}
      color="google plus"
      style={{ marginLeft: "0.5em" }}
    >
      <Icon name="log out" />
      Log Out
    </Button>
  );
};

export default NavBarRightLinks;
