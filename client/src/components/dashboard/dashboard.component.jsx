import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileCallBegin,
  profileMessageSelector,
} from "../../store/slices/profile";
import { authTokenSelector } from "../../store/slices/auth";
import useToast from "../../Hooks/toast.hook";

const DashBoard = () => {
  const dispatch = useDispatch();
  const token = useSelector(authTokenSelector);
  const profileMessage = useSelector(profileMessageSelector);
  const toast = useToast();

  useEffect(() => {
    dispatch(getProfileCallBegin(token));
  }, []);

  useEffect(() => {
    const { icon, title } = profileMessage;
    if (icon && title) {
      toast.fire({
        icon,
        title,
      });
    }
  }, [profileMessage]);

  return <div>dash</div>;
};

export default DashBoard;
