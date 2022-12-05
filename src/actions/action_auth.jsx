import {
  USER_SIGNUP,
  USER_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  REF_SIGNUP,
} from "./types";
import { API_KEY, BACKEND_URL } from "./api";
import {
  setUsersAccount,
  unsetUsersAccount,
} from "../components/Auth/AccessControl";

export const loadUserSignup = (result) => {
  return {
    type: USER_SIGNUP,
    payload: result,
  };
};

export const signup = (data, user) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/authenticate/email/${user}/signup/?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const json = await response.json();

      if (json.error) {
        throw json.error;
      }
      return dispatch(loadUserSignup(json));
    } catch (err) {
      return dispatch(
        loadUserSignup({
          success: false,
          data: err.message,
        })
      );
    }
  };
};
export const loadUserRefSignup = (result) => {
  return {
    type: REF_SIGNUP,
    payload: result,
  };
};

export const refSignup = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/register?reflink=${data.referralLink}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const json = await response.json();

      if (json.error) {
        throw json.error;
      }
      return dispatch(loadUserRefSignup(json));
    } catch (err) {
      return dispatch(
        loadUserRefSignup({
          success: false,
          data: err.message,
        })
      );
    }
  };
};

export const loadUserLogin = (result) => {
  return {
    type: USER_LOGIN,
    payload: result,
  };
};

export const login = (data, user) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/authenticate/email/${user}/login/?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const json = await response.json();
      const { id, accessToken } = json.data;
      setUsersAccount({ user, id, accessToken });
      if (json.error) {
        throw json.error;
      }
      return dispatch(loadUserLogin(json));
    } catch (err) {
      return dispatch(
        loadUserLogin({
          success: false,
          data: err.message,
        })
      );
    }
  };
};

export const loadForgotPassword = (result) => {
  return {
    type: FORGOT_PASSWORD,
    payload: result,
  };
};

export const forgotPassword = (data, user) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/authenticate/email/${user}/forgot-password/?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const json = await response.json();
      if (json.error) {
        throw json.error;
      }
      return dispatch(loadForgotPassword(json));
    } catch (err) {
      return dispatch(
        loadForgotPassword({
          success: false,
          data: err.message,
        })
      );
    }
  };
};

export const loadResetPassword = (result) => {
  return {
    type: RESET_PASSWORD,
    payload: result,
  };
};

export const resetPassword = (data, user) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/authenticate/email/${user}/reset-password/?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const json = await response.json();
      if (json.error) {
        throw json.error;
      }
      return dispatch(loadResetPassword(json));
    } catch (err) {
      return dispatch(
        loadResetPassword({
          success: false,
          data: err.message,
        })
      );
    }
  };
};

export const signoutUser = (user) => {
  unsetUsersAccount(user);
  window.location.reload();
};
