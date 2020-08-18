import React, { useState, useEffect } from "react";
import {
  Header,
  Icon,
  Form,
  Grid,
  Button,
  Dropdown,
  Segment,
  Label,
} from "semantic-ui-react";
import FormInput from "../../utils/FormInput/FormInput.component";
import { useSelector, useDispatch } from "react-redux";
import { authTokenSelector } from "../../../store/slices/auth";
import {
  createOrUpdateProfileCallBegin,
  profileSelector,
  profileLoadingSelector,
} from "../../../store/slices/profile";
import {
  formErrorsSelector,
  clearPrompts,
} from "../../../store/slices/prompts";

const CreateOrUpdataProfile = () => {
  const [formData, setFormData] = useState({});
  const {
    company,
    skills,
    bio,
    social: { youtube, linkedin, instagram, twitter, facebook },
    status,
    location,
    website,
    githubusername,
  } = useSelector(profileSelector);
  const [skillsOptions, setSkillsOptions] = useState([]);
  const token = useSelector(authTokenSelector);
  const loading = useSelector(profileLoadingSelector);
  const errors = useSelector(formErrorsSelector);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(createOrUpdateProfileCallBegin({ token, formData }));
  };

  useEffect(() => {
    setFormData({
      ...formData,
      company,
      bio,
      status,
      location,
      website,
      facebook,
      instagram,
      linkedin,
      twitter,
      youtube,
      skills,
      githubusername,
    });
    const userSkills = skills.map((skill) => ({
      key: skill,
      text: skill,
      value: skill,
    }));
    setSkillsOptions(userSkills);
    return () => {
      dispatch(clearPrompts());
    };
  }, []);

  const handleAddSkill = (e, { value }) => {
    setSkillsOptions([...skillsOptions, { key: value, text: value, value }]);
  };

  const handleSkillChange = (e, { value }) => {
    setFormData({ ...formData, skills: [...value] });
  };

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Segment
          padded
          style={{ marginTop: 30, marginBottom: 30, minWidth: 300 }}
        >
          <Grid.Row>
            <Header as="h2" icon textAlign="center">
              <Icon name="user" circular />
              <Header.Content>Profile</Header.Content>
            </Header>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column>
              <Form>
                <FormInput
                  type="text"
                  valueName="company"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="building outline"
                  iconPosition="left"
                  defaultValue={formData.company}
                />
                <FormInput
                  type="text"
                  valueName="website"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="world"
                  iconPosition="left"
                  defaultValue={formData.website}
                />
                <FormInput
                  type="text"
                  valueName="bio"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="user circle"
                  iconPosition="left"
                  defaultValue={formData.bio}
                />
                <FormInput
                  type="text"
                  valueName="status"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="briefcase"
                  iconPosition="left"
                  defaultValue={formData.status}
                />
                <FormInput
                  type="text"
                  valueName="location"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="location arrow"
                  iconPosition="left"
                  defaultValue={formData.location}
                />
                <Form.Field>
                  {errors && errors.skills ? (
                    <Label pointing="below" prompt>
                      {errors.skills}
                    </Label>
                  ) : null}
                  <Dropdown
                    placeholder="Skills"
                    name="skills"
                    fluid
                    multiple
                    search
                    selection
                    allowAdditions
                    onAddItem={handleAddSkill}
                    onChange={handleSkillChange}
                    options={skillsOptions}
                    defaultValue={skills}
                    style={{ marginBottom: 12 }}
                    error={errors && errors.skills ? true : false}
                  />
                </Form.Field>
                <FormInput
                  type="text"
                  valueName="githubUserName"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="github"
                  iconPosition="left"
                  defaultValue={formData.githubusername}
                />
                <FormInput
                  type="text"
                  valueName="youtube"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="youtube"
                  iconPosition="left"
                  defaultValue={formData.youtube}
                />
                <FormInput
                  type="text"
                  valueName="facebook"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="facebook"
                  iconPosition="left"
                  defaultValue={formData.facebook}
                />
                <FormInput
                  type="text"
                  valueName="twitter"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="twitter"
                  iconPosition="left"
                  defaultValue={formData.twitter}
                />
                <FormInput
                  type="text"
                  valueName="instagram"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="instagram"
                  iconPosition="left"
                  defaultValue={formData.instagram}
                />
                <FormInput
                  type="text"
                  valueName="linkedin"
                  errorsArray={errors}
                  setFormData={setFormData}
                  formData={formData}
                  icon="linkedin"
                  iconPosition="left"
                  defaultValue={formData.linkedin}
                />
                <Button
                  loading={loading}
                  disabled={loading}
                  color="vk"
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

export default CreateOrUpdataProfile;
