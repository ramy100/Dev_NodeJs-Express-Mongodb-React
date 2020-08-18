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
import {
  likePostCallBegin,
  unLikePostCallBegin,
  postsLoadingSelector,
  deletePostCallBegin,
} from "../../../store/slices/posts";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  authTokenSelector,
  authuserSelector,
} from "../../../store/slices/auth";
import Swal from "sweetalert2";

const PostComponent = ({ post }) => {
  const dispatch = useDispatch();
  const token = useSelector(authTokenSelector);
  const user = useSelector(authuserSelector);
  const loading = useSelector(postsLoadingSelector);
  const isLiked = post.likes.some((like) => like.user === user._id)
    ? true
    : false;
  const likePost = () => {
    isLiked
      ? dispatch(unLikePostCallBegin({ token, postId: post._id }))
      : dispatch(likePostCallBegin({ token, postId: post._id }));
  };
  const deletePost = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        dispatch(deletePostCallBegin({ token, postId: post._id }));
      }
    });
  };

  return (
    <Segment raised style={{ borderRadius: 10, width: "100%" }}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image size="small" src={post.avatar} />
            <Header textAlign="center" content={post.name} />
          </Grid.Column>
          <Grid.Column width={14}>
            {post.user == user._id ? (
              <Button
                floated="right"
                loading={loading}
                disabled={loading}
                circular
                icon={<Icon name="x" color="red" />}
                onClick={deletePost}
              />
            ) : (
              ""
            )}
            <pre
              style={{
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                fontSize: 15,
                fontWeight: "bold",
                color: "#0f4c75",
                textAlign: "left",
              }}
            >
              {post.text}
            </pre>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={14} textAlign="justified">
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Button fluid as="div" labelPosition="right">
                    <Button
                      fluid
                      color={isLiked ? "red" : "vk"}
                      onClick={likePost}
                      loading={loading}
                      disabled={loading}
                    >
                      <Icon
                        name={
                          isLiked ? "thumbs down outline" : "thumbs up outline"
                        }
                      />
                      {isLiked ? "Unlike" : "Like"}
                    </Button>
                    <Label basic pointing="left">
                      {post.likes.length}
                    </Label>
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Button
                    fluid
                    as={Link}
                    to={`post/${post._id}`}
                    labelPosition="right"
                  >
                    <Button fluid color="green">
                      <Icon name="comment" />
                      Discussion
                    </Button>
                    <Label basic pointing="left">
                      {post.comments.length}
                    </Label>
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
