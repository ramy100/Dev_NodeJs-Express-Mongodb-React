import emailValidatior from "email-validator";

export const registerValidation = (emptyArr, formData) => {
  const { email, password, password2 } = formData;
  for (const [key, value] of Object.entries(formData)) {
    if (!value && key !== "password2") {
      emptyArr.push(`${key} is required`);
    }
  }
  if (email && !emailValidatior.validate(email)) {
    emptyArr.push("invalid email");
  }
  if (password !== password2) {
    emptyArr.push("password confirmation dosen't match");
  }
};
