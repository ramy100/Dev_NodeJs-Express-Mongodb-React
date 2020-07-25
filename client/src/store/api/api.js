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
