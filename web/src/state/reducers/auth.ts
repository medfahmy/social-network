import { SET_CURRENT_USER } from "../action-creators/action-types";
import isEmpty from "validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};
