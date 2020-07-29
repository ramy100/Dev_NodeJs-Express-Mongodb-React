import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Form, Message } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  login_user_begin,
  authErrorsSelector,
  clearAuthErrors,
  authLoadingSelector,
  authuserSelector,
  sendAuthMessage,
} from "../../store/slices/auth";
import FormInput from "../utils/FormInput/FormInput.component";

const Login = () => {
  const [formData, setFormData] = useState({});

  const user = useSelector(authuserSelector);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const errors = useSelector(authErrorsSelector);
  const loading = useSelector(authLoadingSelector);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login_user_begin(formData));
  };

  useEffect(() => {
    setFormData({});
  }, [user]);

  useEffect(() => {
    if (state) {
      dispatch(sendAuthMessage(state.redirectMessage));
    }
    return () => {
      dispatch(clearAuthErrors());
    };
  }, []);

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      {errors.notFound ? (
        <Message negative>
          <Message.Header>{errors.notFound}</Message.Header>
          <p>Username or Password is incorrect</p>
        </Message>
      ) : null}
      <Form loading={loading} className="form">
        <div className="form-group">
          <FormInput
            type="text"
            valueName="email"
            errorsArray={errors}
            onChanleHandler={handleChange}
          />
        </div>
        <div className="form-group">
          <FormInput
            type="password"
            valueName="password"
            errorsArray={errors}
            onChanleHandler={handleChange}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Login"
          onClick={handleLogin}
        />
      </Form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
