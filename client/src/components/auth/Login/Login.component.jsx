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
  login_user_begin,
} from "../../../store/slices/auth";
import { useLocation, Link } from "react-router-dom";
import FormInput from "../../utils/FormInput/FormInput.component";
import {
  formErrorsSelector,
  clearPrompts,
  setPopUp,
} from "../../../store/slices/prompts";

const LoginForm = () => {
  const [formData, setFormData] = useState({});

  const user = useSelector(authuserSelector);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const errors = useSelector(formErrorsSelector);
  const loading = useSelector(authLoadingSelector);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login_user_begin(formData));
  };

  useEffect(() => {
    setFormData({});
  }, [user]);

  useEffect(() => {
    if (state) {
      console.log(state.redirectMessage);
      dispatch(setPopUp("info", state.redirectMessage));
    }
    return () => {
      dispatch(clearPrompts());
    };
  }, []);

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          {/* <Image src="/logo.png" /> Log-in to your account */}
          Log-in to your account
        </Header>
        {errors.notFound ? (
          <Message negative>
            <Message.Header>{errors.notFound}</Message.Header>
            <p>Username or Password is incorrect</p>
          </Message>
        ) : null}
        <Form size="large">
          <Segment stacked>
            <FormInput
              type="text"
              valueName="email"
              errorsArray={errors}
              formData={formData}
              setFormData={setFormData}
              icon="user"
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

            <Button
              color="vk"
              fluid
              size="large"
              type="submit"
              loading={loading}
              disabled={loading}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/register">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
