import axios from "axios";
import {
  ACTION_SET_ERRORS,
  ACTION_SET_AUTHED_USER,
  SERVER_HOST,
  ACTION_ENQUEUE_SNACKBAR,
  ACTION_REMOVE_SNACKBAR
} from "../constants";
import { setAuthToken } from "../utils";
import jwtDecode from "jwt-decode";

export const setErrors = data => ({
  type: ACTION_SET_ERRORS,
  payload: data
});
export const setAuthedUser = data => ({
  type: ACTION_SET_AUTHED_USER,
  payload: data
});
export const clearErrors = () => ({ type: ACTION_SET_ERRORS, payload: {} });
export const enqueueSnackbar = (variant, message) => {
  const snackbar = {
    message,
    options: {
      variant
    }
  };
  return {
    type: ACTION_ENQUEUE_SNACKBAR,
    payload: {
      snackbar
    }
  };
};
export const removeSnackbar = key => ({
  type: ACTION_REMOVE_SNACKBAR,
  payload: {
    key
  }
});

export const registerNewUser = newUser => dispatch =>
  axios
    .post(`${SERVER_HOST}/users/register`, newUser)
    .then(res => {
      dispatch(
        enqueueSnackbar(
          "success",
          `Successfully registered new user: ${res.data.email}`
        )
      );
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch(
        enqueueSnackbar("error", "Something went wrong with registration")
      );
      dispatch(setErrors(err.response.data));
    });

export const login = user => dispatch =>
  axios
    .post(`${SERVER_HOST}/users/login`, user)
    .then(res => {
      dispatch(enqueueSnackbar("success", `Welcome ${user.email}`));
      dispatch(clearErrors());

      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      dispatch(setAuthedUser(jwtDecode(token)));
    })
    .catch(err => {
      dispatch(enqueueSnackbar("error", "Something went wrong with login"));
      dispatch(setErrors(err.response.data));
    });

export const logout = () => dispatch => {
  dispatch(clearErrors());
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setAuthedUser({}));
};
