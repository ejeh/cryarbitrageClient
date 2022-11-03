import { combineReducers } from "redux";
import userAuthReducer from "./reducer_auth";
import userProfileUpdateReducer from "./reducer_user_profile";
import buyCrytoReducer from "./reducer_buycryto";

export default combineReducers({
  // user reducers
  userAuth: userAuthReducer,
  update: userProfileUpdateReducer,
  buyCrypto: buyCrytoReducer,
});
