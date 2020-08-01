import React from "react";
import { Form } from "semantic-ui-react";
const FormInput = ({
  valueName,
  errorsArray,
  formData,
  setFormData,
  type,
  withPreValue,
  ...otherProps
}) => {
  const getPlaceholder = (s) => {
    if (typeof s !== "string") return "";
    let i = 0;
    let placeholder = "";
    while (i < s.length) {
      placeholder +=
        i === 0
          ? s.charAt(i).toUpperCase()
          : s.charAt(i) === s.charAt(i).toUpperCase()
          ? " " + s.charAt(i)
          : s.charAt(i);
      i++;
    }
    return placeholder;
  };

  return (
    <Form.Input
      placeholder={getPlaceholder(valueName)}
      type={type}
      error={
        errorsArray[valueName]
          ? {
              content: errorsArray[valueName],
              pointing: "below",
            }
          : false
      }
      name={valueName}
      onChange={(e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }}
      {...otherProps}
    />
  );
};

export default FormInput;
