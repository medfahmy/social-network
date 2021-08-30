import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "utils/setAuthToken";
import { ActionType } from "state/action-types";

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("api/user/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: ActionType.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/user/login", userData)
    .then((res) => {
      // save to localStorage
      const token = res.data.token;
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: ActionType.GET_ERRORS,
        payload: err.response,
      })
    );
};

export const setCurrentUser = (decoded) => {
  return {
    type: ActionType.SET_CURRENT_USER,
    payload: decoded,
  };
};

// log user out
export const logoutUser = () => (dispatch) => {
  // remove token from localStorage
  localStorage.removeItem("jwtToken");
  // remove auth header
  setAuthToken(false);
  // set current user to {}
  dispatch(setCurrentUser({}));
};
