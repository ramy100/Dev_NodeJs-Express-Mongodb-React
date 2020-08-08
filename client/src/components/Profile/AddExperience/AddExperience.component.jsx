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
} from "semantic-ui-react";
import FormInput from "../../utils/FormInput/FormInput.component";
import { useSelector, useDispatch } from "react-redux";
import { authTokenSelector } from "../../../store/slices/auth";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import {
  profileLoadingSelector,
  addExperienceCallBegin,
} from "../../../store/slices/profile";
import {
  formErrorsSelector,
  clearPrompts,
} from "../../../store/slices/prompts";

const AddExperience = () => {
  const [formData, setFormData] = useState({ current: false });
  const { current } = formData;
  const token = useSelector(authTokenSelector);
  const loading = useSelector(profileLoadingSelector);
  const errors = useSelector(formErrorsSelector);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addExperienceCallBegin({ token, formData }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearPrompts());
    };
  }, []);

  return (
    <div style={{ minHeight: "66vh" }}>
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
                <Header.Content>Add New Experience</Header.Content>
              </Header>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column>
                <Form>
                  <FormInput
                    type="text"
                    valueName="title"
                    errorsArray={errors}
                    setFormData={setFormData}
                    formData={formData}
                    icon="pencil alternate"
                    iconPosition="left"
                  />
                  <FormInput
                    type="text"
                    valueName="company"
                    errorsArray={errors}
                    setFormData={setFormData}
                    formData={formData}
                    icon="building outline"
                    iconPosition="left"
                  />
                  <FormInput
                    type="text"
                    valueName="location"
                    errorsArray={errors}
                    setFormData={setFormData}
                    formData={formData}
                    icon="location arrow"
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
                        error={!!errors.from}
                        allowOnlyNumbers
                        format="DD-MM-YYYY"
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
                    label="Is This Your Current Job ?"
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
                          error={!!errors.to}
                          allowOnlyNumbers
                          format="DD-MM-YYYY"
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
    </div>
  );
};

export default AddExperience;
