import React from "react";
import { Grid, Segment, Header, Icon } from "semantic-ui-react";

const Section = ({ children, iconName, iconColor, title }) => {
  return (
    <Segment
      color="violet"
      padded
      style={{ marginTop: 30, marginBottom: 30, minWidth: 500 }}
    >
      <Grid.Row>
        <Header as="h2" color="violet" icon textAlign="center">
          <Icon name={iconName} color={iconColor} circular />
          <Header.Content>{title}</Header.Content>
        </Header>
      </Grid.Row>
      <Grid.Row>{children}</Grid.Row>
    </Segment>
  );
};

export default Section;
