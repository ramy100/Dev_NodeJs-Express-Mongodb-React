import React from "react";
import { Placeholder, Item } from "semantic-ui-react";

const ProfileListItemPlaceholder = () => {
  return (
    <Item>
      <Item.Image>
        <Placeholder style={{ height: 175, width: 175 }}>
          <Placeholder.Image />
        </Placeholder>
      </Item.Image>
      <Item.Content>
        <Placeholder>
          <Placeholder.Line length="short" />
        </Placeholder>
        <Item.Meta>
          <Placeholder>
            <Placeholder.Line length="very short" />
          </Placeholder>
        </Item.Meta>
        <Item.Description>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
              <Placeholder.Line length="medium" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

export default ProfileListItemPlaceholder;
