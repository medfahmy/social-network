import { ADD_POST } from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
}
