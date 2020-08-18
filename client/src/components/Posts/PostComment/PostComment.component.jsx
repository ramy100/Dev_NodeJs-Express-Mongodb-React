import React from "react";
import { Segment, Grid, Image, Header, Icon, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {
  postsLoadingSelector,
  deleteCommentCallBegin,
} from "../../../store/slices/posts";
import {
  authuserSelector,
  authTokenSelector,
} from "../../../store/slices/auth";
import Swal from "sweetalert2";

const PostComment = ({ comment, postId }) => {
  const loading = useSelector(postsLoadingSelector);
  const user = useSelector(authuserSelector);
  const token = useSelector(authTokenSelector);
  const dispatch = useDispatch();
  const deleteComment = () => {
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
        dispatch(
          deleteCommentCallBegin({ token, commentId: comment._id, postId })
        );
      }
    });
  };
  return (
    <Segment raised style={{ borderRadius: 10, width: "100%" }}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image size="small" src={comment.avatar} />
            <Header textAlign="center" content={comment.name} />
          </Grid.Column>
          <Grid.Column width={14}>
            {comment.user == user._id ? (
              <Button
                floated="right"
                loading={loading}
                disabled={loading}
                circular
                icon={<Icon name="x" color="red" />}
                onClick={deleteComment}
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
              }}
            >
              {comment.text}
            </pre>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default PostComment;
