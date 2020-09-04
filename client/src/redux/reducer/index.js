import { combineReducers } from "redux";
import users from "./users";
import usersSort from "./usersSort"
import addUser from "./addUser";
import removeUser from"./removeUser";


const reducers = combineReducers({
  users,
  usersSort,
  addUser,
  removeUser,
});

export default reducers;
