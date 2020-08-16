import React from "react";
import {
  Segment,
  Grid,
  Header,
  Image,
  Button,
  Label,
  Icon,
} from "semantic-ui-react";

const PostComponent = ({ post }) => {
  return (
    <Segment raised style={{ borderRadius: 10, width: "100%" }}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image size="small" src={post.avatar} />
            <Header content={post.name} />
          </Grid.Column>
          <Grid.Column width={14} verticalAlign="middle">
            <p
              style={{
                wordWrap: "break-word",
                fontSize: 15,
                fontWeight: "bold",
                color: "#0f4c75",
              }}
            >
              {post.text}
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={14} textAlign="justified">
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Button fluid as="div" labelPosition="right">
                    <Button fluid color="vk">
                      <Icon name="heart" />
                      Like
                    </Button>
                    <Label as="a" basic pointing="left">
                      {post.likes.length}
                    </Label>
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Button fluid color="green">
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
  );
};

export default PostComponent;
