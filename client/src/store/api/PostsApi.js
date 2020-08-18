import Axios from "axios";

export const requestCreatePost = (token, data) =>
  Axios.request({
    baseURL: "/api",
    url: "/posts",
    method: "POST",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data,
  });

export const requestGetAllPosts = (token, pageNum, toSkip) =>
  Axios.request({
    baseURL: "/api",
    url: `/posts/page`,
    headers: {
      "x-auth-token": token,
    },
    method: "POST",
    data: { pageNum, toSkip },
  });

export const requestUserPosts = (token) =>
  Axios.request({
    baseURL: "/api",
    url: "/posts/me",
    headers: {
      "x-auth-token": token,
    },
  });

export const requestGetPostById = (token, postId) =>
  Axios.request({
    baseURL: "/api",
    url: `/posts/${postId}`,
    headers: {
      "x-auth-token": token,
    },
  });

export const requestDeletePostById = (token, postId) =>
  Axios.request({
    baseURL: "/api",
    url: `/posts/${postId}`,
    headers: {
      "x-auth-token": token,
    },
    method: "DELETE",
  });

export const requestLikePostById = (token, postId) =>
  Axios.request({
    baseURL: "/api",
    url: `/posts/like/${postId}`,
    headers: {
      "x-auth-token": token,
    },
    method: "PUT",
  });

export const requestUnLikePostById = (token, postId) =>
  Axios.request({
    baseURL: "/api",
    url: `/posts/unlike/${postId}`,
    headers: {
      "x-auth-token": token,
    },
    method: "PUT",
  });

export const requestPutCommentToPost = (token, postId, data) =>
  Axios.request({
    baseURL: "/api",
    url: `/posts/comment/${postId}`,
    headers: {
      "x-auth-token": token,
    },
    method: "PUT",
    data,
  });

export const requestDeleteCommentFromPost = (token, postId, commentId) =>
  Axios.request({
    baseURL: "/api",
    url: `/posts/comment/${postId}/${commentId}`,
    headers: {
      "x-auth-token": token,
    },
    method: "DELETE",
  });
