import { ActionType } from "state/action-types";

interface ProfileState {
  profile: Profile;
  profile: Profiles[];
  loading: boolean;
}

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case ActionType.GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case ActionType.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
};
