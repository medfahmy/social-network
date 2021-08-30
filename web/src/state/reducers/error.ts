import { ActionType } from "state/action-types";

const initialState = {};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
