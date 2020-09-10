import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUsers } from "../redux/action/users";
import { removeUser } from "../redux/action/removeUser";
import { getUsersSearchAndSort } from "../redux/action/searchSort";
import UsersEntry from "./UsersEntry";
import Paginations from "./Paginations";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import RemoveIcon from "@material-ui/icons/Remove";

const debounceCreator = () => {
  let ref;
  return (func, timeout, val) => {
    clearTimeout(ref);
    ref = setTimeout(() => func(val), timeout);
  };
};

const getSearchHelper = debounceCreator();

const Users = ({
  getUsers,
  users,
  getUsersSearchAndSort,
  removeUser,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState("");
  const [first, setFirst] = useState(true);
  const [name, setName] = useState("");

  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = users.data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  let condition = {
    sort: sort,
    searchInput: searchInput.trim()
  };
  useEffect(() => {
    getUsers();
  }, []);

  // useEffect(() => {
  //   getUsers(condition);
  // }, []);

  useEffect(() => {
    getSearchHelper(getUsersSearchAndSort, 800, condition);
  }, [sort, searchInput]);

  console.log(users);

  const handleSort = (e, name) => {
    e.preventDefault();
    getSort(name);
    setName(name);
    getUsersSearchAndSort(condition)
  };

  const handleRemove = (e, id) => {
    e.preventDefault();
    removeUser(condition, id);
  };

  const handleSearch = e => {
    setSearchInput(e.target.value);
    //getSearchHelper(getUsersSearchAndSort, 600, condition);
  };
  //sorting
  let getSort = name => {
    setFirst(false);
    switch (name) {
      case "firstname":
        if (
          sort !== "firstname" &&
          sort !== "firstname_ascending" &&
          sort !== ""
        ) {
          setSort("");
        }
        if (sort === "") {
          setSort("firstname");
        } else if (sort === "firstname") {
          setSort("firstname_ascending");
        } else {
          setSort("");
        }
        break;
      case "lastname":
        if (
          sort !== "lastname" &&
          sort !== "lastname_ascending" &&
          sort !== ""
        ) {
          setSort("");
        }
        if (sort === "") {
          setSort("lastname");
        } else if (sort === "lastname") {
          setSort("lastname_ascending");
        } else {
          setSort("");
        }
        break;
      case "sex":
        if (sort !== "sex" && sort !== "sex_ascending" && sort !== "") {
          setSort("");
        }
        if (sort === "") {
          setSort("sex");
        } else if (sort === "sex") {
          setSort("sex_ascending");
        } else {
          setSort("");
        }
        break;
      case "age":
        if (sort !== "age" && sort !== "age_ascending" && sort !== "") {
          setSort("");
        }
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

  // pagination
  const changePage = direction => {
    if (direction === "back") {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next") {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="box">
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <h1>Search Users</h1>
          <input
            type="text"
            placeholder="Enter anything you want search "
            value={searchInput}
            onChange={handleSearch}
            required
          ></input>
        </form>
        {users.data.length === 0 && (
          <p style={{ color: "red" }}>No such a user exist in our database</p>
        )}
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
              {sort === "firstname" && <ArrowDropDownIcon />}
              {sort === "firstname_ascending" && <ArrowDropUpIcon />}
              {sort === "" && <RemoveIcon />}
            </th>
            <th
              style={{
                cursor: "pointer",
                color: "lightblue"
              }}
              onClick={e => {
                handleSort(e, "lastname");
              }}
            >
              LastName
              {sort === "lastname" && <ArrowDropDownIcon />}
              {sort === "lastname_ascending" && <ArrowDropUpIcon />}
              {sort === "" && <RemoveIcon />}
            </th>
            <th
              style={{ cursor: "pointer", color: "lightblue" }}
              onClick={e => {
                handleSort(e, "sex");
              }}
            >
              Sex
              {sort === "sex" && <ArrowDropDownIcon />}
              {sort === "sex_ascending" && <ArrowDropUpIcon />}
              {sort === "" && <RemoveIcon />}
            </th>
            <th
              style={{ cursor: "pointer", color: "lightblue" }}
              onClick={e => {
                handleSort(e, "age");
              }}
            >
              Age
              {sort === "age" && <ArrowDropDownIcon />}
              {sort === "age_ascending" && <ArrowDropUpIcon />}
              {sort === "" && <RemoveIcon />}
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
      <Paginations
        usersPerPage={usersPerPage}
        totalUsers={users.data.length}
        paginate={paginate}
        currentPage={currentPage}
        changePage={changePage}
      />
      <div className="adduser">
        <Link to="/Adduser">
          <AddCircleIcon />
          <h3>create new user</h3>
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
    removeUser: (condition, id) => {
      dispatch(removeUser(condition, id));
    },
    getUsersSearchAndSort: (condition) =>{
      dispatch(getUsersSearchAndSort(condition))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
