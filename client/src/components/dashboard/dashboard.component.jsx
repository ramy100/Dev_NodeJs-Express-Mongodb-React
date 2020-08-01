import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileCallBegin } from "../../store/slices/profile";
import { authTokenSelector } from "../../store/slices/auth";

const DashBoard = () => {
  const dispatch = useDispatch();
  const token = useSelector(authTokenSelector);

  useEffect(() => {
    dispatch(getProfileCallBegin(token));
  }, []);

  return <div>dash</div>;
};

export default DashBoard;
