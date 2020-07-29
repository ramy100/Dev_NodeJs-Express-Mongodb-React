import React from "react";
import { useSelector } from "react-redux";
import { selectAlerts } from "../../store/slices/alert";
const Alert = () => {
  const alerts = useSelector(selectAlerts);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};

export default Alert;
