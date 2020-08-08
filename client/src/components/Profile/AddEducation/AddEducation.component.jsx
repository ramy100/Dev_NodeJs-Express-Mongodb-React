import React, { useState, useEffect } from "react";
import {
  Header,
  Icon,
  Form,
  Grid,
  Button,
  Segment,
  Label,
  FormField,
  Checkbox,
  TextArea,
} from "semantic-ui-react";
import FormInput from "../../utils/FormInput/FormInput.component";
import { useSelector, useDispatch } from "react-redux";
import { authTokenSelector } from "../../../store/slices/auth";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import {
  profileLoadingSelector,
  addEducationCallBegin,
} from "../../../store/slices/profile";
import {
  formErrorsSelector,
  clearPrompts,
} from "../../../store/slices/prompts";

const AddEducation = () => {
  const [formData, setFormData] = useState({ current: false });
  const { current } = formData;
  const token = useSelector(authTokenSelector);
  const loading = useSelector(profileLoadingSelector);
  const errors = useSelector(formErrorsSelector);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addEducationCallBegin({ token, formData }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearPrompts());
    };
  }, []);

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Segment
          color="violet"
          padded
          style={{ marginTop: 30, marginBottom: 30, minWidth: 300 }}
        >
          <Grid.Row>
            <Header as="h2" color="violet" icon textAlign="center">
              <Icon name="user" color="violet" circular />
              <Header.Content>Add New Education</Header.Content>
            </Header>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column>
              <Form>
                <FormInput
                  type="text"
                  valueName="school"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="building outline"
                  iconPosition="left"
                />
                <FormInput
                  type="text"
                  valueName="degree"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="graduation"
                  iconPosition="left"
                />
                <FormInput
                  type="text"
                  valueName="fieldOfStudy"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="info"
                  iconPosition="left"
                />

                <FormField>
                  {errors && errors.from ? (
                    <Label pointing="below" prompt>
                      {errors.from}
                    </Label>
                  ) : null}
                  <div>
                    <SemanticDatepicker
                      format="DD-MM-YYYY"
                      error={!!errors.from}
                      allowOnlyNumbers
                      placeholder="From Date"
                      onChange={(e, data) =>
                        setFormData({
                          ...formData,
                          from: data.value
                            ? data.value.toLocaleDateString()
                            : "",
                        })
                      }
                    />
                  </div>
                </FormField>
                <Checkbox
                  toggle
                  label="Still Studying ?"
                  style={{ marginBottom: 10 }}
                  onChange={() =>
                    setFormData({ ...formData, current: !current, to: "" })
                  }
                />
                {!current ? (
                  <FormField>
                    {errors && errors.to ? (
                      <Label pointing="below" prompt>
                        {errors.to}
                      </Label>
                    ) : null}
                    <div>
                      <SemanticDatepicker
                        format="DD-MM-YYYY"
                        error={!!errors.to}
                        allowOnlyNumbers
                        placeholder="to Date"
                        onChange={(e, data) =>
                          setFormData({
                            ...formData,
                            to: data.value
                              ? data.value.toLocaleDateString()
                              : "",
                          })
                        }
                      />
                    </div>
                  </FormField>
                ) : null}
                <TextArea
                  name="description"
                  placeholder="Description"
                  style={{ marginBottom: 10 }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <Button
                  loading={loading}
                  disabled={loading}
                  color="violet"
                  fluid
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default AddEducation;
