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
