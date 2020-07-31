import React, { Fragment } from "react";
import { Menu } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { authuserSelector } from "../../store/slices/auth";
import { Link } from "react-router-dom";

const NavBarLinks = () => {
  const user = useSelector(authuserSelector);

  return (
    <Fragment>
      <Menu.Item as={Link} to="/">
        Home
      </Menu.Item>
      {user ? (
        <Menu.Item as={Link} to="/dashboard" active>
          DashBoard
        </Menu.Item>
      ) : null}
    </Fragment>
  );
};

export default NavBarLinks;
