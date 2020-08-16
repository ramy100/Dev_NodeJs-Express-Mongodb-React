import React from "react";
import {
  Placeholder,
  Grid,
  Button,
  Icon,
  Label,
  Segment,
} from "semantic-ui-react";

const PostsPlaceHolder = () => {
  return (
    <Grid.Row>
      <Segment raised style={{ borderRadius: 10, width: "100%" }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Placeholder>
                <Placeholder.Image />
              </Placeholder>
            </Grid.Column>
            <Grid.Column width={14}>
              <Placeholder>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={14} textAlign="justified">
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Button
                      fluid
                      as="div"
                      labelPosition="right"
                      disabled
                      loading
                    >
                      <Button fluid color="vk">
                        <Icon name="heart" />
                        Like
                      </Button>
                      <Label as="a" basic pointing="left">
                        0
                      </Label>
                    </Button>
                  </Grid.Column>
                  <Grid.Column>
                    <Button fluid color="green" disabled loading>
                      <Icon name="comment" />
                      Comment
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Grid.Row>
  );
};

export default PostsPlaceHolder;
