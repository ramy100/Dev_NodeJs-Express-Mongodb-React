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
import FormInput from "../utils/FormInput/FormInput.component";

const Register = () => {
  const [formData, setFormData] = useState({});

  const user = useSelector(authuserSelector);
  const errors = useSelector(authErrorsSelector);
  const loading = useSelector(authLoadingSelector);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //makes copy of the old formData and then updates the key:value by inserting it again
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(register_user_begin(formData));
  };

  useEffect(() => {
    setFormData({});
    return () => {
      dispatch(clearAuthErrors());
    };
  }, [user]);

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <Form loading={loading} className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <FormInput
            type="text"
            valueName="name"
            errorsArray={errors}
            onChanleHandler={onChange}
          />
        </div>
        <div className="form-group">
          <FormInput
            type="text"
            valueName="email"
            errorsArray={errors}
            onChanleHandler={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <FormInput
            type="password"
            valueName="password"
            errorsArray={errors}
            onChanleHandler={onChange}
          />
        </div>
        <div className="form-group">
          <FormInput
            type="password"
            valueName="passwordConfirmation"
            errorsArray={errors}
            onChanleHandler={onChange}
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
