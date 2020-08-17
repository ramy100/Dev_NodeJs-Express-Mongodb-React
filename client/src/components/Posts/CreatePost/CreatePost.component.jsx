import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import {
  Grid,
  Segment,
  Button,
  Image,
  Modal,
  Header,
  Label,
  Form,
} from "semantic-ui-react";
import {
  authuserSelector,
  authTokenSelector,
} from "../../../store/slices/auth";
import {
  createPostCallBegin,
  postsLoadingSelector,
  closeModal,
  openModal,
  openCreatePostModalSelector,
} from "../../../store/slices/posts";
import {
  clearPrompts,
  formErrorsSelector,
  clearFormSelector,
} from "../../../store/slices/prompts";
const CreatePost = () => {
  const user = useSelector(authuserSelector);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const token = useSelector(authTokenSelector);
  const loading = useSelector(postsLoadingSelector);
  const errors = useSelector(formErrorsSelector);
  const open = useSelector(openCreatePostModalSelector);
  const clear = useSelector(clearFormSelector);
  const createPost = async () => {
    dispatch(createPostCallBegin({ token, text }));
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
    <Fragment>
      <Segment
        raised
        tertiary
        style={{
          borderRadius: 10,
          width: "100%",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image size="small" circular src={user.avatar} spaced />
            </Grid.Column>
            <Grid.Column width={14} verticalAlign="middle">
              <Button
                fluid
                circular
                content={`What's in your mind ,${user.name} ?`}
                color="vk"
                onClick={() => dispatch(openModal())}
                size="large"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Modal dimmer="blurring" open={open}>
        <Modal.Header>
          <Button
            floated="right"
            icon="cancel"
            circular
            onClick={() => dispatch(closeModal())}
          />
          <Header textAlign="center">Create Post</Header>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              {errors && errors.text ? (
                <Label pointing="below" prompt>
                  {errors.text}
                </Label>
              ) : null}
            </Form.Field>
          </Form>
          <PostTextArea
            spellCheck={false}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's in your mind"
            value={text}
            maxRows="10"
            rows="3"
            error={errors.text ? errors.text : ""}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            fluid
            circular
            color="vk"
            onClick={createPost}
            loading={loading}
          >
            Post
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

const PostTextArea = styled(TextareaAutosize)`
  font-size: ${({ value }) => (value.length > 20 ? "30px" : "50px")};
  text-align: ${({ value }) => (value.length > 20 ? "left" : "center")};
  border: ${({ error }) => (error ? "1px solid #9F3A38" : "none")};
  max-width: 100%;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export default CreatePost;
