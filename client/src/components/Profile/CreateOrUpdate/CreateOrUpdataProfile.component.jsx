import React, { useState, useEffect } from "react";
import { Header, Icon, Form, Grid, Button, Dropdown } from "semantic-ui-react";
import FormInput from "../../utils/FormInput/FormInput.component";
import { useSelector, useDispatch } from "react-redux";
import { authTokenSelector } from "../../../store/slices/auth";
import {
  createOrUpdateProfileCallBegin,
  profileErrorsSelector,
  clearProfileErrors,
  profileSelector,
} from "../../../store/slices/profile";

const CreateOrUpdataProfile = () => {
  const [formData, setFormData] = useState({});
  const {
    company,
    skills,
    bio,
    social: { youtube, linkedin, instagram, twitter, facebook },
    status,
    website,
    githubusername,
  } = useSelector(profileSelector);
  const [skillsOptions, setSkillsOptions] = useState([]);
  const token = useSelector(authTokenSelector);
  const errors = useSelector(profileErrorsSelector);
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
      dispatch(clearProfileErrors());
    };
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleAddSkill = (e, { value }) => {
    setSkillsOptions([...skillsOptions, { key: value, text: value, value }]);
  };

  const handleSkillChange = (e, { value }) => {
    setFormData({ ...formData, skills: [...value] });
  };

  return (
    <div>
      <Header as="h2" icon textAlign="center">
        <Icon name="user" circular />
        <Header.Content>Profile</Header.Content>
      </Header>
      <Grid centered columns={1}>
        <Grid.Row centered columns={2}>
          <Grid.Column>
            <Form>
              <FormInput
                type="text"
                valueName="company"
                errorsArray={errors}
                setFormData={setFormData}
                formData={formData}
                icon="university"
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
              <Dropdown
                placeholder="skills"
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
                error={errors.skills ? true : false}
              />
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
                color="teal"
                fluid
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default CreateOrUpdataProfile;
