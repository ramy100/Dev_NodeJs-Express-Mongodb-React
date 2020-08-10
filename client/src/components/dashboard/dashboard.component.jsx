import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileCallBegin,
  profileSelector,
} from "../../store/slices/profile";
import { authTokenSelector } from "../../store/slices/auth";
import { Button, Grid, Segment, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ProfileDetail from "../Profile/profileDetail/ProfileDetail.component";
import Section from "../Section/Section.component";
import CardComponent from "../Card/Card.component";

const DashBoard = () => {
  const dispatch = useDispatch();
  const token = useSelector(authTokenSelector);
  const {
    status,
    company,
    website,
    location,
    bio,
    githubusername,
    skills,
    social: { youtube, facebook, twitter, instagram, linkedin },
    experience,
    education,
  } = useSelector(profileSelector);
  useEffect(() => {
    dispatch(getProfileCallBegin(token));
  }, []);

  return (
    <div style={{ minHeight: "65vh" }}>
      <Grid centered columns={2}>
        <Grid.Column>
          <Section iconColor="violet" iconName="user" title="My profile">
            {status ? (
              <Fragment>
                <Segment placeholder textAlign="center">
                  <Grid columns={2} relaxed="very">
                    <Grid.Column verticalAlign="middle" textAlign="center">
                      <ProfileDetail
                        key="company"
                        item={company}
                        label="Company"
                      />
                      <ProfileDetail
                        key="website"
                        item={website}
                        label="Website"
                      />
                      <ProfileDetail
                        key="location"
                        item={location}
                        label="Location"
                      />
                      <ProfileDetail key={bio} item={bio} label="Bio" />
                      <ProfileDetail
                        key="status"
                        item={status}
                        label="Status"
                      />
                      <ProfileDetail
                        key="skills"
                        item={skills}
                        isarray
                        label="Skills"
                      />
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle" textAlign="center">
                      <ProfileDetail
                        key="githubusername"
                        item={githubusername}
                        iconName="github"
                        iconColor="black"
                      />
                      <ProfileDetail
                        key="youtube"
                        item={youtube}
                        iconName="youtube"
                        iconColor="red"
                      />
                      <ProfileDetail
                        key="facebook"
                        item={facebook}
                        iconName="facebook f"
                        iconColor="blue"
                      />
                      <ProfileDetail
                        key="twitter"
                        item={twitter}
                        iconName="twitter"
                        iconColor="blue"
                      />
                      <ProfileDetail
                        key="instagram"
                        item={instagram}
                        iconName="instagram"
                        iconColor="purple"
                      />
                      <ProfileDetail
                        key="linkedin"
                        item={linkedin}
                        iconName="linkedin"
                        iconColor="blue"
                      />
                    </Grid.Column>
                  </Grid>
                  <Divider vertical>Profile Details</Divider>
                </Segment>

                <Button
                  as={Link}
                  style={{ marginTop: 10, marginBottom: 10 }}
                  fluid
                  color="violet"
                  to="/create/profile"
                >
                  update profile
                </Button>
                <Section
                  iconColor="violet"
                  iconName="briefcase"
                  title="Work Experience"
                >
                  <Grid columns={3} centered>
                    {experience && experience.length > 0 ? (
                      experience.map((exp) => (
                        <Grid.Column key={exp._id}>
                          <CardComponent
                            header={`${exp.title} at ${exp.company}`}
                            description={exp.description}
                            from={exp.from}
                            to={exp.to}
                            extra={exp.location}
                          />
                        </Grid.Column>
                      ))
                    ) : (
                      <Grid.Column width="16">
                        <Segment placeholder textAlign="center">
                          No Experience Yet!
                        </Segment>
                      </Grid.Column>
                    )}
                  </Grid>
                </Section>

                <Button
                  as={Link}
                  style={{ marginTop: 10, marginBottom: 10 }}
                  fluid
                  color="violet"
                  to="/add/experience"
                >
                  Add Experience
                </Button>
                <Section
                  iconColor="violet"
                  iconName="graduation"
                  title="Education"
                >
                  <Grid columns={3} centered>
                    {education && education.length > 0 ? (
                      education.map((edu) => (
                        <Grid.Column key={edu._id}>
                          <CardComponent
                            header={`${edu.degree} in ${edu.fieldofstudy}`}
                            description={edu.description}
                            from={edu.from}
                            to={edu.to}
                          />
                        </Grid.Column>
                      ))
                    ) : (
                      <Grid.Column width="16">
                        <Segment placeholder textAlign="center">
                          No Education Yet!
                        </Segment>
                      </Grid.Column>
                    )}
                  </Grid>
                </Section>

                <Button
                  as={Link}
                  style={{ marginTop: 10, marginBottom: 10 }}
                  fluid
                  color="violet"
                  to="/add/education"
                >
                  Add Education
                </Button>
              </Fragment>
            ) : (
              <Segment placeholder textAlign="center">
                No profile yet!
                <Button as={Link} to="/create/profile">
                  create profile
                </Button>
              </Segment>
            )}
          </Section>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default DashBoard;
