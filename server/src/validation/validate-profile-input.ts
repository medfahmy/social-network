import Validator from "validator";
import { isEmpty } from "validation/is-empty";

export const validateProfileInput = (data) => {
  let errors: any = {};
  data.handle = isEmpty(data.handle) ? "" : data.handle;

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required!";
  } else if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 40 characters!";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
