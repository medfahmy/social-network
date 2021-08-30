import Validator from "validator";
import { isEmpty } from "validation/is-empty";
import { User, UserErrors } from "types";

export const validateLoginInput = (data: User) => {
  let errors: UserErrors = {};
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required!";
  } else {
    if (!Validator.isEmail(data.email)) {
      errors.name = "Email is invalid!";
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
