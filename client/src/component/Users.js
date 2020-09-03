import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUsers } from "../redux/action/users";
import UsersEntry from "./UsersEntry";
import Pagination from "./Pagination"
import AddUser from "./AddUser";

const Users = ({ getUsers, users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  useEffect(() => {
    getUsers();
  }, []);
  console.log(users.data.length);

  const handlefirstName = () => {};
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
            <th onClick={handlefirstName}>firstName</th>
            <th>lastName</th>
            <th>sex</th>
            <th>age</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <UsersEntry user={user} key={user._id} />
          ))}
        </tbody>
      </table>
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.data.length}
        paginate={paginate}
      />
      <div className ='adduser'>
      <AddUser/>create new users
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
