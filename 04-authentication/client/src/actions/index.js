import axios from "axios";

import { AUTH_USER } from "./types";

export const signup = ({ email, password }) => async (dispatch) => {
  const response = await axios.post("http://localhost:3090/signup", {
    email,
    password,
  });

  dispatch({
    type: AUTH_USER,
    payload: response.data.token,
  });
};
