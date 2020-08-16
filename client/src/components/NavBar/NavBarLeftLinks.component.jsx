import React, { Fragment, useState } from "react";
import { Menu, Transition } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { authuserSelector } from "../../store/slices/auth";
import { Link, useLocation } from "react-router-dom";

const NavBarLinks = () => {
  const user = useSelector(authuserSelector);
  const location = useLocation();
  const [homeAnimation, sethomeAnimation] = useState(true);
  const [dashBoardAnimation, setDashBoardAnimation] = useState(true);
  const [allProfilesAnimation, setAllProfilesAnimation] = useState(true);
  const [allPostsAnimation, setAllPostsAnimation] = useState(true);
  return (
    <Fragment>
      <Transition animation="pulse" duration={300} visible={homeAnimation}>
        <Menu.Item
          as={Link}
          to="/"
          style={{ transition: ".3s" }}
          active={location.pathname === "/" ? true : false}
          onClick={() => sethomeAnimation(!homeAnimation)}
        >
          Home
        </Menu.Item>
      </Transition>

      {user ? (
        <Fragment>
          <Transition
            animation="pulse"
            duration={300}
            visible={dashBoardAnimation}
          >
            <Menu.Item
              as={Link}
              to="/dashboard"
              style={{ transition: ".3s" }}
              active={location.pathname === "/dashboard" ? true : false}
              onClick={() => setDashBoardAnimation(!dashBoardAnimation)}
            >
              DashBoard
            </Menu.Item>
          </Transition>
          <Transition
            animation="pulse"
            duration={300}
            visible={allPostsAnimation}
          >
            <Menu.Item
              as={Link}
              to="/posts"
              style={{ transition: ".3s" }}
              active={location.pathname === "/posts" ? true : false}
              onClick={() => setAllPostsAnimation(!allPostsAnimation)}
            >
              Posts
            </Menu.Item>
          </Transition>
        </Fragment>
      ) : null}
      <Transition
        animation="pulse"
        duration={300}
        visible={allProfilesAnimation}
      >
        <Menu.Item
          as={Link}
          to="/profiles"
          style={{ transition: ".3s" }}
          active={location.pathname === "/profiles" ? true : false}
          onClick={() => setAllProfilesAnimation(!allProfilesAnimation)}
        >
          Profiles
        </Menu.Item>
      </Transition>
    </Fragment>
  );
};

export default NavBarLinks;
