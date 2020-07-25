import React, { Fragment, useState, useEffect } from "react";
import { registerValidation } from "../../functions/auth-validation";

import { register_user_begin, authuserSelector } from "../../store/slices/auth";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { alertSet, alertsClear } from "../../store/slices/alert";
// import store from '../../store/configurestore'
const Register = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  const [formData, setFormDate] = useState(initialFormData);
  const user = useSelector(authuserSelector);
  const dispatch = useDispatch();
  const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    setFormDate({ ...formData, [e.target.name]: e.target.value }); //makes copy of the old formData and then updates the key:value by inserting it again
  };
  let errors = [];
  const onSubmit = async (e) => {
    e.preventDefault();
    errors = [];
    dispatch(alertsClear());
    registerValidation(errors, formData);
    if (errors.length !== 0) {
      errors.forEach((error) => {
        dispatch(alertSet(error, "danger"));
      });
    } else {
      const newUser = { name, email, password };
      dispatch(register_user_begin(newUser));
    }
  };

  useEffect(() => {
    setFormDate(initialFormData);
  }, [user]);

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </Fragment>
  );
};

export default Register;
