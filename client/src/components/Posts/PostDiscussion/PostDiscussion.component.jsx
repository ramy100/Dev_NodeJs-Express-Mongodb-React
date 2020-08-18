import React, { useEffect, useState } from "react";
import Secion from "../../Section/Section.component";
import PostComponent from "../Post/Post.component";
import { useSelector, useDispatch } from "react-redux";
import { authTokenSelector } from "../../../store/slices/auth";
import {
  formErrorsSelector,
  clearPrompts,
  clearFormSelector,
} from "../../../store/slices/prompts";
import TextareaAutosize from "react-textarea-autosize";

import { Loader, Grid, Form, Label, Button } from "semantic-ui-react";
import {
  postsSelector,
  postsLoadingSelector,
  createCommentCallBegin,
} from "../../../store/slices/posts";
import PostComment from "../PostComment/PostComment.component";
import styled from "styled-components";
const PostDiscussion = ({ match }) => {
  const { postId } = match.params;
  const posts = useSelector(postsSelector);
  const post = posts.find((post) => post._id === postId);
  const token = useSelector(authTokenSelector);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const errors = useSelector(formErrorsSelector);
  const loading = useSelector(postsLoadingSelector);
  const clear = useSelector(clearFormSelector);

  const createComment = () => {
    dispatch(createCommentCallBegin({ token, postId, text }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearPrompts());
    };
  }, []);

  useEffect(() => {
    setText("");
  }, [clear]);

  return (
    <Grid centered style={{ minHeight: "68vh" }}>
      <Grid.Row style={{ marginTop: 100 }}>
        <Grid.Column width={12}>
          {post ? (
            <PostComponent post={post} />
          ) : (
            <Loader
              inline
              active
              content="Loading"
              size="massive"
              style={{ marginTop: 100, textAlign: "center" }}
            />
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={12}>
          {post ? (
            <Secion title="Comments" iconName="comment">
              <Form>
                <Form.Field>
                  {errors && errors.text ? (
                    <Label pointing="below" prompt>
                      {errors.text}
                    </Label>
                  ) : null}
                </Form.Field>
                <CommentTextArea
                  value={text}
                  error={errors}
                  onChange={(e) => setText(e.target.value)}
                  minRows={3}
                  placeholder="Write your comment here !"
                  cacheMeasurements
                />
                <Button
                  loading={loading}
                  disabled={loading}
                  content="Add a comment"
                  color="vk"
                  onClick={createComment}
                />
              </Form>

              {post.comments.map((comment) => (
                <PostComment
                  key={comment._id}
                  comment={comment}
                  postId={postId}
                />
              ))}
            </Secion>
          ) : (
            ""
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const CommentTextArea = styled(TextareaAutosize)`
  font-size: 20px;
  text-align: ${({ value }) => (value.length > 30 ? "left" : "center")};
  border: ${({ error }) => (error ? "1px solid #9F3A38" : "1px solid grey")};
  max-width: 100%;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export default PostDiscussion;
