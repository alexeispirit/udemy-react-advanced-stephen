import axios from "axios";

import { AUTH_USER, AUTH_ERROR } from "./types";

export const signup = ({ email, password }) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3090/signup", {
      email,
      password,
    });

    dispatch({
      type: AUTH_USER,
      payload: response.data.token,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Email in use",
    });
  }
};
