import React from "react";
import { Segment, Grid, Image, Header, Icon, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { postsLoadingSelector } from "../../../store/slices/posts";
import { authuserSelector } from "../../../store/slices/auth";
const PostComment = ({ comment }) => {
  const loading = useSelector(postsLoadingSelector);
  const user = useSelector(authuserSelector);
  return (
    <Segment raised style={{ borderRadius: 10, width: "100%" }}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image size="small" src={comment.avatar} />
            <Header textAlign="center" content={comment.name} />
          </Grid.Column>
          <Grid.Column width={14} verticalAlign="middle">
            <p
              style={{
                wordWrap: "break-word",
                fontSize: 15,
                fontWeight: "bold",
                color: "#0f4c75",
                textAlign: "center",
              }}
            >
              {comment.text}
            </p>
          </Grid.Column>
        </Grid.Row>
        {comment.user == user._id ? (
          <Grid.Row>
            <Grid.Column>
              <Button fluid as="div" labelPosition="right">
                <Button fluid color="red" loading={loading} disabled={loading}>
                  <Icon name="trash" />
                  Delete
                </Button>
              </Button>
            </Grid.Column>
          </Grid.Row>
        ) : (
          ""
        )}
      </Grid>
    </Segment>
  );
};

export default PostComment;
