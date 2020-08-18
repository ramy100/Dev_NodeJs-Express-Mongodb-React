// import { apiCallBegan } from "../actions/api-call";
// import axios from "axios";
// import { alertSet } from "../slices/alert";
// export default (store) => (next) => async (action) => {
//   if (action.type !== apiCallBegan.type) {
//     next(action);
//   } else {
//     const {
//       method,
//       data,
//       url,
//       headers,
//       onSuccess,
//       onFail,
//       displayRegisterErrors,
//     } = action.payload;
//     console.log(method + data + url + headers);
//     try {
//       const res = await axios.request({
//         baseURL: "/api",
//         url,
//         headers,
//         method,
//         data,
//       });
//       // console.log(res.data);
//       if (onSuccess) store.dispatch({ type: onSuccess, payload: res.data });
//     } catch (err) {
//       if (onFail)
//         store.dispatch({ type: onFail, payload: err.response.data.error });
//       if (displayRegisterErrors) {
//         if (err.response.data.errors) {
//           err.response.data.errors.forEach((error) => {
//             store.dispatch(alertSet(error.msg, "danger"));
//           });
//         }
//         if (err.response.data.error)
//           store.dispatch(alertSet(err.response.data.error, "danger"));
//       }
//       // console.log(err.response.data.errors);
//     }
//   }
// };
