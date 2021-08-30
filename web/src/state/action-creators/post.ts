import axios from "axios";
import { ActionType } from "state/action-types";

export const addPost = (postData) => (dispatch) => {
  axios
    .post("/api/post", postData)
    .then((res) =>
      dispatch({
        type: ActionType.ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ActionType.GET_ERRORS,
        payload: err.response.data,
      })
    );
};
