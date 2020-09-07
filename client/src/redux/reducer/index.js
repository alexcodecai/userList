import { combineReducers } from "redux";
import users from "./users";
import usersSort from "./usersSort"
import addUser from "./addUser";
import removeUser from"./removeUser";
import getSingleUser from"./getSingleUser"


const reducers = combineReducers({
  users,
  usersSort,
  addUser,
  removeUser,
  getSingleUser
});

export default reducers;
