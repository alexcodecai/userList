import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUsers } from "../redux/action/users";
import { getUsersSorted } from "../redux/action/usersSort";
import { removeUser } from "../redux/action/removeUser";
import { searchUsers } from "../redux/action/searchUser";
import UsersEntry from "./UsersEntry";
import Pagination from "./Pagination";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Link } from "react-router-dom";

const Users = ({
  getUsers,
  users,
  getUsersSorted,
  removeUser,
  searchUsers
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  console.log(searchInput);

  const handleSort = (e, name) => {
    e.preventDefault();
    getSort(name);
    getUsersSorted(sort);
  };

  const handleRemove = (e, id) => {
    e.preventDefault();
    removeUser(id, sort);
  };

  const handleSearchInput = e => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e, Input) => {
    e.preventDefault();
    searchUsers(Input);
  };

  let getSort = name => {
    switch (name) {
      case "firstname":
        if (sort === "") {
          setSort("firstname");
        } else if (sort === "firstname") {
          setSort("firstname_ascending");
        } else {
          setSort("");
        }
      case "lastname":
        if (sort === "") {
          setSort("lastname");
        } else if (sort === "lastname") {
          setSort("lastname_ascending");
        } else {
          setSort("");
        }
      case "sex":
        if (sort === "") {
          setSort("sex");
        } else if (sort === "sex") {
          setSort("sex_ascending");
        } else {
          setSort("");
        }
      case "age":
        if (sort === "") {
          setSort("age");
        } else if (sort === "age") {
          setSort("age_ascending");
        } else {
          setSort("");
        }
        break;
    }
  };

  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = users.data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="box">
      <div>
        <form onSubmit={e => handleSearch(e, searchInput)}>
          <h1>Search Users</h1>
          <input
            type="text"
            placeholder="Enter anything you want search "
            onChange={handleSearchInput}
          ></input>
          <button type="submit">GO!</button>
        </form>
      </div>
      <table className="content-table">
        <thead>
          <tr>
            <th>Edit</th>
            <th>Delete</th>
            <th
              style={{ cursor: "pointer", color: "lightblue" }}
              onClick={e => {
                handleSort(e, "firstname");
              }}
            >
              FirstName
            </th>
            <th
              style={{ cursor: "pointer", color: "lightblue" }}
              onClick={e => {
                handleSort(e, "lastname");
              }}
            >
              LastName
            </th>
            <th
              style={{ cursor: "pointer", color: "lightblue" }}
              onClick={e => {
                handleSort(e, "sex");
              }}
            >
              Sex
            </th>
            <th
              style={{ cursor: "pointer", color: "lightblue" }}
              onClick={e => {
                handleSort(e, "age");
              }}
            >
              Age
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
    removeUser: (id, sort) => {
      dispatch(removeUser(id, sort));
    },
    searchUsers: input => {
      dispatch(searchUsers(input));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
