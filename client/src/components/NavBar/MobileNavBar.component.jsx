import React, { Fragment } from "react";
import { Container, Icon, Menu, Sidebar } from "semantic-ui-react";
import { useState } from "react";
import NavBarLeftLinks from "./NavBarLeftLinks.component";
import NavBarRightLinks from "./NavBarRightLinks.component";

const MobileNavBar = () => {
  const [sideBarOpened, setSideBarOpened] = useState(false);
  return (
    <Fragment>
      <Sidebar
        as={Menu}
        animation="overlay"
        inverted
        onHide={() => setSideBarOpened(false)}
        vertical
        visible={sideBarOpened}
      >
        <NavBarLeftLinks />
      </Sidebar>

      <Container>
        <Menu inverted pointing secondary size="large">
          <Menu.Item onClick={() => setSideBarOpened(!sideBarOpened)}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Item position="right">
            <NavBarRightLinks />
          </Menu.Item>
        </Menu>
      </Container>
    </Fragment>
  );
};

export default MobileNavBar;
