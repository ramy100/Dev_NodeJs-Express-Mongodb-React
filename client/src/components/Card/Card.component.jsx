import React from "react";
import { Icon, Card } from "semantic-ui-react";

const CardComponent = ({ header, from, to, description, extra }) => {
  return (
    <Card>
      <Card.Content>
        <Icon
          style={{ float: "right" }}
          circular
          name="trash alternate outline"
          color="green"
        />
        <Card.Header>{header}</Card.Header>
        <Card.Meta>{`
      ${new Date(from).getFullYear()} - ${
          to ? new Date(to).getFullYear() : "Untill Now"
        }`}</Card.Meta>
        <Card.Description>
          <p>{description}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>{extra}</p>
      </Card.Content>
    </Card>
  );
};

export default CardComponent;
