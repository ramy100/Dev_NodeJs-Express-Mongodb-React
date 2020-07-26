import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Message } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  login_user_begin,
  authErrorsSelector,
  clearAuthErrors,
  authLoadingSelector,
} from "../../store/slices/auth";

const Login = () => {
  const initialFormData = { email: "", password: "" };
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const errors = useSelector(authErrorsSelector);
  const loading = useSelector(authLoadingSelector);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    dispatch(login_user_begin(formData));
  };
  useEffect(() => {
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
          <Form.Input
            placeholder="Email Address"
            error={
              errors.email
                ? {
                    content: errors.email,
                    pointing: "below",
                  }
                : false
            }
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <Form.Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <input
          type="button"
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
