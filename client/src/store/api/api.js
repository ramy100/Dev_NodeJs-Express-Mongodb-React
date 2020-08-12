import Axios from "axios";

export const requestRegisterUserApi = (data) => {
  return Axios.request({
    url: "/users",
    baseURL: "http://localhost:5000/api",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
};

export const requestLoginUserApi = (data) => {
  return Axios.request({
    url: "/auth",
    baseURL: "http://localhost:5000/api",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
};

export const requestGetUserApi = (token) => {
  return Axios.request({
    url: "/auth",
    baseURL: "http://localhost:5000/api",
    method: "get",
    headers: {
      "x-auth-token": token,
    },
  });
};

export const requestGetUserProfile = (token) => {
  return Axios.request({
    url: "/me",
    baseURL: "http://localhost:5000/api/profile",
    method: "get",
    headers: {
      "x-auth-token": token,
    },
  });
};

export const requestGetUserProfileById = (token, userId) => {
  return Axios.request({
    url: `/user/${userId}`,
    baseURL: "http://localhost:5000/api/profile",
    method: "get",
  });
};

export const requestGetAllUsersProfile = (pageNum) => {
  return Axios.request({
    url: `/profile/${pageNum}`,
    baseURL: "http://localhost:5000/api",
    method: "get",
  });
};

export const requestCreateOrUpdateUserProfile = (token, data) => {
  return Axios.request({
    url: "/profile",
    baseURL: "http://localhost:5000/api",
    method: "post",
    headers: {
      "x-auth-token": token,
    },
    data,
  });
};

export const requestDeleteUserProfile = (token) => {
  return Axios.request({
    url: "/profile",
    baseURL: "http://localhost:5000/api",
    method: "delete",
    headers: {
      "x-auth-token": token,
    },
  });
};

export const requestPutUserProfileExperience = (token, data) => {
  return Axios.request({
    url: "/experience",
    baseURL: "http://localhost:5000/api/profile",
    method: "put",
    headers: {
      "x-auth-token": token,
    },
    data,
  });
};

export const requestPutUserProfileEducation = (token, data) => {
  return Axios.request({
    url: "/education",
    baseURL: "http://localhost:5000/api/profile",
    method: "put",
    headers: {
      "x-auth-token": token,
    },
    data,
  });
};

export const requestDeleteUserProfileExperience = (token, expId) => {
  return Axios.request({
    url: `/experience/${expId}`,
    baseURL: "http://localhost:5000/api/profile",
    method: "delete",
    headers: {
      "x-auth-token": token,
    },
  });
};

export const requestDeleteUserProfileEducation = (token, eduId) => {
  return Axios.request({
    url: `/education/${eduId}`,
    baseURL: "http://localhost:5000/api/profile",
    method: "delete",
    headers: {
      "x-auth-token": token,
    },
  });
};
