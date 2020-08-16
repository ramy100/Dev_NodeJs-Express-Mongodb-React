import React, { useEffect, Fragment } from "react";
import Section from "../../Section/Section.component";

import { Grid, Visibility } from "semantic-ui-react";
import Post from "../Post/Post.component";
import CreatePost from "../CreatePost/CreatePost.component";
import {
  postsCurrentPageSelector,
  getPostsCallBegin,
  postsSelector,
  postsLoadingSelector,
  isLastPageSelector,
  AddedPostsSelector,
} from "../../../store/slices/posts";
import { useDispatch, useSelector } from "react-redux";
import { authTokenSelector } from "../../../store/slices/auth";
import PostsPlaceHolder from "../PostsPlaceholder/PostsPlaceHolder.component";
import NoMorePosts from "../NoMorePosts/NoMorePosts.component";
const ListPosts = () => {
  const pageNum = useSelector(postsCurrentPageSelector);
  const token = useSelector(authTokenSelector);
  const posts = useSelector(postsSelector);
  const loading = useSelector(postsLoadingSelector);
  const isLastPage = useSelector(isLastPageSelector);
  const addedPosts = useSelector(AddedPostsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLastPage) {
      getPosts();
    }
  }, []);

  const getPosts = () => {
    if (!isLastPage) {
      dispatch(getPostsCallBegin({ token, pageNum, addedPosts }));
    }
  };

  return (
    <Grid centered>
      <Grid.Column width={12}>
        <Visibility once={false} onBottomVisible={() => getPosts()}>
          <Section title="Posts" iconName="edit outline">
            <Grid centered divided="vertically">
              <Grid.Row>
                <CreatePost />
              </Grid.Row>
              {posts
                ? posts.map((post) => (
                    <Grid.Row key={post._id}>
                      <Post post={post} />
                    </Grid.Row>
                  ))
                : ""}
              {loading ? (
                <Fragment>
                  <PostsPlaceHolder />
                  <PostsPlaceHolder />
                  <PostsPlaceHolder />
                </Fragment>
              ) : (
                ""
              )}
              {isLastPage ? <NoMorePosts /> : ""}
            </Grid>
          </Section>
        </Visibility>
      </Grid.Column>
    </Grid>
  );
};

export default ListPosts;
