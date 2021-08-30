import { Dispatch } from "redux";
import axios from "axios";

import { ActionType } from "state/action-types";

export const getCurrentProfile = () => (dispatch: Dispatch<>) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then((res) => {
      dispatch({
        type: ActionType.GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionType.GET_PROFILE,
        payload: {},
      });
    });
};

export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/${handle}`)
    .then((res) => {
      dispatch({
        type: ActionType.GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionType.GET_PROFILE,
        payload: null,
      });
    });
};

export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then((res) => {
      dispatch({
        type: ActionType.GET_PROFILES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionType.GET_PROFILES,
        payload: null,
      });
    });
};

export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) => {
      dispatch({
        type: ActionType.GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setProfileLoading = () => {
  return {
    type: ActionType.PROFILE_LOADING,
  };
};

export const clearCurrentProfile = () => {
  return {
    type: ActionType.CLEAR_CURRENT_PROFILE,
  };
};

export const deleteAccount = () => (dispatch) => {
  console.log("yo");
  if (window.confirm("are you sure, this cannot be undone!")) {
    axios
      .delete("/api/profile")
      .then((res) =>
        dispatch({
          type: ActionType.SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch((err) =>
        dispatch({
          type: ActionType.GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};
