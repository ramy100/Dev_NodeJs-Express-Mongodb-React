import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileCallBegin,
  profileSelector,
} from "../../store/slices/profile";
import { authTokenSelector } from "../../store/slices/auth";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const dispatch = useDispatch();
  const token = useSelector(authTokenSelector);
  const myProfile = useSelector(profileSelector);
  useEffect(() => {
    dispatch(getProfileCallBegin(token));
  }, []);

  return myProfile.status ? (
    <Button as={Link} to="/create/profile">
      update profile
    </Button>
  ) : (
    <Button as={Link} to="/create/profile">
      create profile
    </Button>
  );
};

export default DashBoard;
