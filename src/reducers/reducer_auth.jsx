import {
  USER_SIGNUP,
  USER_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  REF_SIGNUP,
} from "../actions/types";

const INITIALSTATE = {};

const userAuthReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case USER_SIGNUP:
      output = { ...state, signup: action.payload };
      break;
    case REF_SIGNUP:
      output = { ...state, refSignup: action.payload };
      break;

    case USER_LOGIN:
      output = { ...state, login: action.payload };
      break;

    case FORGOT_PASSWORD:
      output = { ...state, forgotPassword: action.payload };
      break;

    case RESET_PASSWORD:
      output = { ...state, resetPassword: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default userAuthReducer;
