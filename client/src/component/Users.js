import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUsers } from "../redux/action/users";
import { getUsersSorted } from "../redux/action/usersSort";
import { removeUser } from "../redux/action/removeUser";
import { searchUsers } from "../redux/action/searchUser";
import UsersEntry from "./UsersEntry";
import Paginations from "./Paginations";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";


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
  getUsersSorted,
  removeUser,
  searchUsers
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

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() =>{
    getUsersSorted(sort)
  }, [sort])

  let condition = {
    sort:sort,
    searchInput: searchInput,
  }

  const handleSort = (e, name) => {
    e.preventDefault();
    getSort(name);
    setName(name);
  };

  const handleRemove = (e, id) => {
    e.preventDefault();
    removeUser(condition, id);
  };
  
  const handleSearch = e => {
    setSearchInput(e.target.value);
    getSearchHelper(searchUsers, 600, e.target.value.trim());
  }
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
          if (
            sort !== "sex" &&
            sort !== "sex_ascending" &&
            sort !== ""
          ) {
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
          if (
            sort !== "age" &&
            sort !== "age_ascending" &&
            sort !== ""
          ) {
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
            value = {searchInput}
            onChange={handleSearch}
            required
          ></input>
        </form>
        {(users.data.length === 0) && (<p style={{ color: "red" }}>No such a user exist in our database</p>)}
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
      <Paginations
        usersPerPage={usersPerPage}
        totalUsers={users.data.length}
        paginate={paginate}
        currentPage={currentPage}
        changePage={changePage}
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
    getUsersSorted: (name,condition) => {
      dispatch(getUsersSorted(name, condition));
    },
    removeUser: (condition, id) => {
      dispatch(removeUser(condition, id));
    },
    searchUsers: (input,condition) => {
      dispatch(searchUsers(input, condition));
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
