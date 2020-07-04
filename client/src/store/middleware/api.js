import { apiCallBegan } from "../actions/api-call";
import axios from "axios";
export default (store) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) {
    next(action);
  } else {
    const { method, data, url, headers } = action.payload;
    console.log(method + data + url + headers);
    try {
      const res = await axios.request({
        baseURL: "http://localhost:5000/api",
        url,
        headers,
        method,
        data,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
};
