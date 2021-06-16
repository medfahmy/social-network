import axios from "axios";

import { CLEAR_CURRENT_PROFILE, GET_PROFILE, PROFILE_LOADING } from "./types";

export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      console.log("how about here");
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: {},
      });
      console.log("here");
    });
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
