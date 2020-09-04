import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUsers } from "../redux/action/users";
import { getUsersSorted } from "../redux/action/usersSort";
import { removeUser } from "../redux/action/removeUser";
import UsersEntry from "./UsersEntry";
import Pagination from "./Pagination";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Link } from "react-router-dom";

const Users = ({ getUsers, users, getUsersSorted, removeUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  useEffect(() => {
    getUsers();
  }, []);
  console.log(users.data.length)
  const handleSort = (e, name) => {
    e.preventDefault();
    getUsersSorted(name);
  };
  
  const handleRemove = (e, id) => {
    e.preventDefault();
    removeUser(id);
  };

  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = users.data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className="box">
      <table className="content-table">
        <thead>
          <tr>
            <th>Edit</th>
            <th>Delete</th>
            <th>
              <ArrowDropDownIcon
                style={{ cursor: "pointer", color: "red" }}
                onClick={e => {
                  handleSort(e, "firstname");
                }}
              />
              FirstName
              <ArrowDropUpIcon
                style={{ cursor: "pointer", color: "green" }}
                onClick={e => {
                  handleSort(e, "firstname_ascending");
                }}
              />
            </th>
            <th>
              <ArrowDropDownIcon
                style={{ cursor: "pointer", color: "red" }}
                onClick={e => {
                  handleSort(e, "lastname");
                }}
              />
              LastName
              <ArrowDropUpIcon
                style={{ cursor: "pointer", color: "green" }}
                onClick={e => {
                  handleSort(e, "lastname_ascending");
                }}
              />
            </th>
            <th>
              <ArrowDropDownIcon
                style={{ cursor: "pointer", color: "red" }}
                onClick={e => {
                  handleSort(e, "sex");
                }}
              />
              Sex
              <ArrowDropUpIcon
                style={{ cursor: "pointer", color: "green" }}
                onClick={e => {
                  handleSort(e, "sex_ascending");
                }}
              />
            </th>
            <th>
              <ArrowDropDownIcon
                style={{ cursor: "pointer", color: "red" }}
                onClick={e => {
                  handleSort(e, "age");
                }}
              />
              Age
              <ArrowDropUpIcon
                style={{ cursor: "pointer", color: "green" }}
                onClick={e => {
                  handleSort(e, "age_ascending");
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <UsersEntry
              user={user}
              key={user._id}
              handleRemove={handleRemove}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.data.length}
        paginate={paginate}
      />
      <div className="adduser">
        <Link to="/Adduser">
          create new user
          <AddCircleIcon />
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch(getUsers());
    },
    getUsersSorted: name => {
      dispatch(getUsersSorted(name));
    },
    removeUser: id => {
      dispatch(removeUser(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
