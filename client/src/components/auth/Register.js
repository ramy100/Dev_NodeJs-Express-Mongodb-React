import React, { Fragment, useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  register_user_begin,
  authuserSelector,
  authErrorsSelector,
  clearAuthErrors,
  authLoadingSelector,
} from "../../store/slices/auth";
// Redux
import { useDispatch, useSelector } from "react-redux";
const Register = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const user = useSelector(authuserSelector);
  const errors = useSelector(authErrorsSelector);
  const loading = useSelector(authLoadingSelector);
  const dispatch = useDispatch();
  const { name, email, password, passwordConfirmation } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //makes copy of the old formData and then updates the key:value by inserting it again
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, password, passwordConfirmation };
    dispatch(register_user_begin(newUser));
  };

  useEffect(() => {
    return () => {
      setFormData(initialFormData);
      dispatch(clearAuthErrors());
    };
  }, []);

  useEffect(() => {
    setFormData(initialFormData);
  }, [user]);

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <Form loading={loading} className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <Form.Input
            type="text"
            placeholder="Name"
            name="name"
            error={
              errors.name
                ? {
                    content: errors.name,
                    pointing: "below",
                  }
                : false
            }
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <Form.Input
            type="text"
            placeholder="Email Address"
            name="email"
            value={email}
            error={
              errors.email
                ? {
                    content: errors.email,
                    pointing: "below",
                  }
                : false
            }
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <Form.Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            error={
              errors.password
                ? {
                    content: errors.password,
                    pointing: "below",
                  }
                : false
            }
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <Form.Input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            error={
              errors.passwordConfirmation
                ? {
                    content: errors.passwordConfirmation,
                    pointing: "below",
                  }
                : false
            }
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </Form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
