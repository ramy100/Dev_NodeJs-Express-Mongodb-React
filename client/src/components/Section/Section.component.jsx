import React from "react";
import { Grid, Segment, Header, Icon, Image } from "semantic-ui-react";

const Section = ({ children, iconName, iconColor, title, image }) => {
  return (
    <Segment padded style={{ marginTop: 30, marginBottom: 30, minWidth: 500 }}>
      <Grid.Row>
        <Header as="h2" icon textAlign="center">
          {iconName ? (
            <Icon name={iconName} color={iconColor} circular />
          ) : image ? (
            <Image src={image} size="massive" circular />
          ) : (
            ""
          )}
          <Header.Content>{title}</Header.Content>
        </Header>
      </Grid.Row>
      <Grid.Row>{children}</Grid.Row>
    </Segment>
  );
};

export default Section;
