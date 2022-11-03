import { USER_PROFILE_UPDATE, FETCH_USER_PROFILE } from "../actions/types";

const INITIALSTATE = {};

const userProfileUpdate = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case USER_PROFILE_UPDATE:
      output = { ...state, updateUser: action.payload };
      break;
    case FETCH_USER_PROFILE:
      output = { ...state, fetchUser: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default userProfileUpdate;
