import { combineReducers } from "redux";
import { authReducer } from "state/reducers/auth";
import { errorReducer } from "state/reducers/error";
import { profileReducer } from "state/reducers/profile";
import { postReducer } from "state/reducers/post";

const reducers = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
