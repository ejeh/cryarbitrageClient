import { BUY_CRYTO } from "../actions/types";

const INITIALSTATE = {};

const buyCrytoReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case BUY_CRYTO:
      output = { ...state, crypto: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default buyCrytoReducer;
