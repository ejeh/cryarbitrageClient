import {
  getFromLocalStorage,
  addToLocalStorage,
  removeFromLocalStorage,
  removeFromSessionStorage,
} from "../../helpers/browserStorage";
import { BACKEND_URL, API_KEY } from "../../actions/api";

const LS_KEY = "crytoarbitrage-login:";

export const getUsersToken = (user) => {
  try {
    switch (user) {
      case "user":
        return JSON.parse(getFromLocalStorage(`${LS_KEY}user`));
      case "admin":
        return JSON.parse(getFromLocalStorage(`${LS_KEY}admin`));
      case "all":
        return {
          user: JSON.parse(getFromLocalStorage(`${LS_KEY}user`)),
          admin: JSON.parse(getFromLocalStorage(`${LS_KEY}admin`)),
        };
      default:
        return {};
    }
  } catch (ex) {}
  return {};
};

export const getUserData = ({ user, id, accessToken }) => {
  let token = accessToken;
  let userId = id;
  if (!token) token = getUsersToken(user);
  if (token && typeof token.accessToken === "string") token = token.accessToken;
  if (!id) userId = id || getUserId(user);
  if (typeof token !== "string") return Promise.resolve(false);
  if (!userId) return Promise.resolve(false);
  return fetch(
    `${BACKEND_URL}/${user.toLowerCase()}/${userId}?key=${API_KEY}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((responseJSON) => {
      if (responseJSON.success && Object.keys(responseJSON.data).length > 1) {
        return responseJSON.data;
      }
      return false;
    })
    .catch((ex) => {
      throw ex;
    });
};

export const setUsersAccount = ({ user, id, accessToken }) => {
  return getUserData({ user, id, accessToken })
    .then((profile) => {
      let strippedDownProfile = {};
      switch (user) {
        case "user":
          strippedDownProfile = {
            firstName: profile.firstName,
            lastName: profile.lastName,
            id,
          };
          break;
        case "admin":
          strippedDownProfile = {
            id,
            standing: profile.standing,
            action: profile.action,
            completeProfile: profile.completeProfile,
            fullname: profile.fullname,
          };
          break;
        default:
      }
      const data = { accessToken, profile: strippedDownProfile };
      addToLocalStorage(`${LS_KEY}${user}`, JSON.stringify(data));
      return { accessToken, profile: strippedDownProfile };
    })
    .catch((ex) => ex.message);
};

export const getUserId = (user) => {
  try {
    const data = JSON.parse(getFromLocalStorage(`${LS_KEY}${user}`));
    return data.profile ? data.profile.id : false;
  } catch (ex) {
    return false;
  }
};

export const unsetUsersAccount = (user) => {
  try {
    const id = getUserId(user);
    removeFromLocalStorage(`${LS_KEY}${user}`);
    removeFromSessionStorage(id);
  } catch (ex) {
    console.log(ex.message);
  }
};

export const userIs = (users) => {
  try {
    const auth = getUsersToken("all");
    let output = false;
    users.map((user) => {
      if (auth[user]) {
        try {
          output = auth[user].accessToken && auth[user].profile.id;
        } catch (err) {
          unsetUsersAccount(user);
        }
      }
      return user;
    });
    return output;
  } catch (err) {
    console.log(err.message);
  }
  return null;
};
