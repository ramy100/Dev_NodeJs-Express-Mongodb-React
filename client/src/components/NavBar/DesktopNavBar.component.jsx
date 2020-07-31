import React from "react";
import { Container, Menu, Visibility } from "semantic-ui-react";
import { useState } from "react";
import NavBarLeftLinks from "./NavBarLeftLinks.component";
import NavBarRightLinks from "./NavBarRightLinks.component";

const DesktopNavBar = () => {
  const [fixed, setFixed] = useState(false);

  return (
    <Visibility
      once={false}
      onBottomPassed={() => setFixed(true)}
      onBottomPassedReverse={() => setFixed(false)}
    >
      <Menu
        fixed={fixed ? "top" : null}
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size="large"
      >
        <Container>
          <NavBarLeftLinks />
          <Menu.Item position="right">
            <NavBarRightLinks fixed={fixed} />
          </Menu.Item>
        </Container>
      </Menu>
    </Visibility>
  );
};

export default DesktopNavBar;
