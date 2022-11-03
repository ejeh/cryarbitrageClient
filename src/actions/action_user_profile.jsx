import { USER_PROFILE_UPDATE, FETCH_USER_PROFILE } from "./types";
import { getFromLocalStorage } from "../helpers/browserStorage";
import { BACKEND_URL, API_KEY } from "../actions/api";
import { getUserId } from "../components/Auth/AccessControl";

export const loadUserProfileUpdate = (result) => {
  return {
    type: USER_PROFILE_UPDATE,
    payload: result,
  };
};

export const userProfileUpdate = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/?key=${API_KEY}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${
            JSON.parse(getFromLocalStorage("crytoarbitrage-login:user"))
              .accessToken
          }`,
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      if (json.error) {
        throw json.error;
      }
      return dispatch(loadUserProfileUpdate(json));
    } catch (error) {
      return dispatch(
        loadUserProfileUpdate({
          success: false,
          data: error.message,
        })
      );
    }
  };
};

export const loadUserProfile = (result) => {
  return {
    type: FETCH_USER_PROFILE,
    payload: result,
  };
};

export const fetchUserProfile = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/user/${getUserId("user")}/?key=${API_KEY}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${
              JSON.parse(getFromLocalStorage("crytoarbitrage-login:user"))
                .accessToken
            }`,
          },
          body: JSON.stringify(),
        }
      );

      const json = await response.json();
      if (json.error) {
        throw json.error;
      }
      return dispatch(loadUserProfile(json));
    } catch (error) {
      return dispatch(
        loadUserProfile({
          success: false,
          data: error.message,
        })
      );
    }
  };
};
