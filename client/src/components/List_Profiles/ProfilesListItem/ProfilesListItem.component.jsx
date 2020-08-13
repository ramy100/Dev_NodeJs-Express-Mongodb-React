import React, { Fragment } from "react";
import { Item, Icon, Button, Label } from "semantic-ui-react";
import ProfileDetail from "../../Profile/profileDetail/ProfileDetail.component";
import { Link } from "react-router-dom";
import UserProfile from "../../UserProfile/UserProfile.component";

const ProfilesListItem = ({ profile }) => {
  return (
    <Item>
      <Item.Image src={profile.user.avatar} />

      <Item.Content>
        <Item.Header as={Link} to={`/user/${profile.user._id}`}>
          {profile.user.name}
        </Item.Header>
        <Item.Meta>
          <span style={{ fontWeight: "bold", color: "purple", marginRight: 5 }}>
            Experience :
          </span>
          {profile.experience.length !== 0 ? (
            profile.experience.map((exp) => (
              <Fragment key={exp._id}>
                <Icon color="green" name="check" />
                <span
                  style={{ marginRight: 10 }}
                >{`${exp.title} at ${exp.company}`}</span>
              </Fragment>
            ))
          ) : (
            <span>No Experience Yet!</span>
          )}
        </Item.Meta>
        <Item.Description>
          <span style={{ fontWeight: "bold", color: "purple", marginRight: 5 }}>
            Education :
          </span>
          {profile.education.length !== 0 ? (
            profile.education.map((edu) => (
              <Fragment key={edu._id}>
                <Icon color="green" name="check" />
                <span
                  style={{ marginRight: 10 }}
                >{`${edu.degree} from ${edu.school}`}</span>
              </Fragment>
            ))
          ) : (
            <span>No Education Yet!</span>
          )}
        </Item.Description>
        <Item.Extra>
          <Button
            floated="right"
            color="violet"
            as={Link}
            to={`/user/${profile.user._id}`}
          >
            Full Profile
            <Icon name="right chevron" />
          </Button>
          <ProfileDetail
            key="skills"
            item={profile.skills}
            isarray
            label="Skills"
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ProfilesListItem;
