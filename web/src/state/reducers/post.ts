import { ActionType } from "state/action-types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
};
