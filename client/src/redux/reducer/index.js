import { combineReducers } from "redux";
import users from "./users";
import usersSort from "./usersSort"
import addUser from "./addUser"


const reducers = combineReducers({
  users,
  usersSort,
  addUser,
});

export default reducers;
