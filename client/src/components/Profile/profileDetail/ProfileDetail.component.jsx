import React, { Fragment } from "react";
import { Icon, Label } from "semantic-ui-react";
import "./ProfileDetail.style.scss";
const ProfileDetail = ({
  item,
  label = "",
  isarray = false,
  iconName = "arrow right",
  iconColor = null,
}) => {
  return (
    <div style={{ marginTop: 11, marginBottom: 11 }}>
      <span className="profile-detail">
        <span className="profile-label">
          {label}
          <Icon name={iconName} color={iconColor} />
        </span>
      </span>

      {isarray && item
        ? item.map((skill) => (
            <Fragment key={skill}>
              <Label color="grey" style={{ marginBottom: 2 }}>
                <Icon name="check" />
                {skill}
              </Label>
              <span> </span>
            </Fragment>
          ))
        : !isarray && item
        ? item
        : "Empty"}
    </div>
  );
};

export default ProfileDetail;
