import React, { Fragment } from "react";
import { useEffect } from "react";
import { Grid, Loader, Segment, Image, Icon, Header } from "semantic-ui-react";
import { requestGetUserProfileById } from "../../store/api/AuthApi";
import { useState } from "react";
const UserProfile = ({ match }) => {
  const [profile, setProfile] = useState({ user: { avatar: "" } });
  const [loading, setLoading] = useState(true);
  const { social, user, website, bio, skills, education, experience } = profile;
  const getUserProfileAsync = async (userId) => {
    setLoading(true);
    try {
      const res = await requestGetUserProfileById(userId);
      setProfile(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    //get user by id
    getUserProfileAsync(match.params.userId);
  }, []);

  return (
    <Fragment>
      <Grid centered style={{ minHeight: "68vh" }}>
        <Grid.Column width={12}>
          {!loading ? (
            <Fragment>
              <Segment style={{ marginTop: 50, marginBottom: 50 }} raised>
                <Grid centered>
                  <Grid.Row color="brown">
                    <Image src={user.avatar} circular size="medium" />
                  </Grid.Row>
                  <Grid.Row color="brown">
                    <h1>{user.name}</h1>
                  </Grid.Row>
                  <Grid.Row columns={8} color="brown">
                    {website ? (
                      <Grid.Column textAlign="center">
                        <Icon name="world" />
                        <p>{website}</p>
                      </Grid.Column>
                    ) : (
                      ""
                    )}
                    {social
                      ? Object.keys(social).map((item) =>
                          social[item] ? (
                            <Grid.Column textAlign="center" key={item}>
                              <Icon name={item} />
                              <p>{social[item]}</p>
                            </Grid.Column>
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </Grid.Row>
                </Grid>
              </Segment>
              <Segment placeholder raised>
                <Grid divided="vertically">
                  <Grid.Row>
                    <Grid.Column textAlign="center">
                      <Header>Bio</Header>
                      <p>
                        {bio ? (
                          <span style={{ fontSize: 18 }}>{bio}</span>
                        ) : (
                          "No Bio Yet!"
                        )}
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column textAlign="center">
                      <Header>Skills</Header>
                      {skills
                        ? skills.map((skill) => (
                            <div
                              style={{ margin: 5, display: "inline" }}
                              key={skill}
                            >
                              <Icon name="check" />
                              <span style={{ fontSize: 18 }}>{skill}</span>
                            </div>
                          ))
                        : "No Skills Yet!"}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <Grid columns={2} style={{ marginBottom: 50, marginTop: 50 }}>
                <Grid.Column stretched>
                  <Segment raised>
                    <Header>Experience</Header>
                    <Grid divided="vertically">
                      {experience && experience.length > 0 ? (
                        experience.map((exp) => (
                          <Grid.Row key={exp._id}>
                            <Segment
                              style={{ width: "100%", margin: 10 }}
                              placeholder
                            >
                              <div style={{ paddingLeft: 14 }}>
                                <Header>
                                  {exp.company}
                                  <Header.Subheader>
                                    {new Date(exp.from).getFullYear()} -
                                    {exp.to
                                      ? new Date(exp.to).getFullYear()
                                      : " Current"}
                                  </Header.Subheader>
                                </Header>
                                <Header>
                                  Position
                                  <Header.Subheader>
                                    {exp.title}
                                  </Header.Subheader>
                                </Header>
                                <Header>
                                  Description
                                  <Header.Subheader>
                                    {exp.description
                                      ? exp.description
                                      : "No Description"}
                                  </Header.Subheader>
                                </Header>
                              </div>
                            </Segment>
                          </Grid.Row>
                        ))
                      ) : (
                        <Grid.Column>
                          <Header textAlign="center" style={{ paddingTop: 50 }}>
                            No Experience Yet!
                          </Header>
                        </Grid.Column>
                      )}
                    </Grid>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment raised>
                    <Header>Education</Header>
                    <Grid divided="vertically">
                      {education && education.length > 0 ? (
                        education.map((edu) => (
                          <Grid.Row key={edu._id}>
                            <Segment
                              style={{ width: "100%", margin: 10 }}
                              placeholder
                            >
                              <div style={{ paddingLeft: 14 }}>
                                <Header>
                                  {edu.school}
                                  <Header.Subheader>
                                    {new Date(edu.from).getFullYear()} -
                                    {edu.to
                                      ? new Date(edu.to).getFullYear()
                                      : " Current"}
                                  </Header.Subheader>
                                </Header>
                                <Header>
                                  Degree
                                  <Header.Subheader>
                                    {edu.degree}
                                  </Header.Subheader>
                                </Header>
                                <Header>
                                  Field Of Study
                                  <Header.Subheader>
                                    {edu.fieldofstudy}
                                  </Header.Subheader>
                                </Header>
                                <Header>
                                  Description
                                  <Header.Subheader>
                                    {edu.description
                                      ? edu.description
                                      : "No Description"}
                                  </Header.Subheader>
                                </Header>
                              </div>
                            </Segment>
                          </Grid.Row>
                        ))
                      ) : (
                        <Grid.Column>
                          <Header textAlign="center" style={{ paddingTop: 50 }}>
                            No Education Yet!
                          </Header>
                        </Grid.Column>
                      )}
                    </Grid>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Fragment>
          ) : (
            <Loader
              active
              inline="centered"
              content="Loading Profile"
              style={{ marginTop: 150 }}
              size="huge"
            />
          )}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default UserProfile;
