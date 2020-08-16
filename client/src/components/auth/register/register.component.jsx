import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {
  authuserSelector,
  authLoadingSelector,
  register_user_begin,
} from "../../../store/slices/auth";
import FormInput from "../../utils/FormInput/FormInput.component";
import { Link } from "react-router-dom";
import {
  formErrorsSelector,
  clearPrompts,
} from "../../../store/slices/prompts";

const Register = () => {
  const [formData, setFormData] = useState({});

  const user = useSelector(authuserSelector);
  const errors = useSelector(formErrorsSelector);
  const loading = useSelector(authLoadingSelector);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(register_user_begin(formData));
  };

  useEffect(() => {
    setFormData({});
    return () => {
      dispatch(clearPrompts());
    };
  }, [user]);

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          {/* <Image src="/logo.png" /> Log-in to your account */}
          Sing-up new account
        </Header>

        <Form onSubmit={(e) => onSubmit(e)} size="large">
          <Segment stacked>
            <FormInput
              type="text"
              valueName="name"
              errorsArray={errors}
              formData={formData}
              setFormData={setFormData}
              icon="user"
              iconPosition="left"
            />
            <FormInput
              type="text"
              valueName="email"
              errorsArray={errors}
              formData={formData}
              setFormData={setFormData}
              icon="mail"
              iconPosition="left"
            />
            <FormInput
              type="password"
              valueName="password"
              errorsArray={errors}
              formData={formData}
              setFormData={setFormData}
              icon="lock"
              iconPosition="left"
            />
            <FormInput
              type="password"
              valueName="passwordConfirmation"
              errorsArray={errors}
              formData={formData}
              setFormData={setFormData}
              icon="lock"
              iconPosition="left"
            />

            <Button
              color="vk"
              fluid
              size="large"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to="/login">Log In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
