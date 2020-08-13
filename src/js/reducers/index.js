import { combineReducers } from "redux";
import useractivity from "./useractitvityReducer";
import userdetails from "./handleuserReducer";

export default combineReducers({
  useractivity,
  userdetails,
});
