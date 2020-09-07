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

  useEffect(() => {
    getUsers();
  }, []);

  const handleSort = (e, name) => {
    e.preventDefault();
    console.log("sort before is " + sort);
    getSort(name);
    console.log("sort after is " + sort);
    if (first) {
      getUsersSorted(name);

      if (name === "firstname") {
        setSort("firstname_ascending");
      } else if (name === "lastname") {
        setSort("lastname_ascending");
      } else if (name === "sex") {
        setSort("sex_ascending");
      } else if (name === "age") {
        setSort("age_ascending");
      }
    } else {
      getUsersSorted(sort);
    }
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
    setFirst(false);

    switch (name) {
      case "firstname":
        console.log("i am in", sort);
        if (
          sort !== "firstname" &&
          sort !== "firstname_ascending" &&
          sort !== ""
        ) {
          setSort("");
        }

        if (sort === "") {
          console.log("empty in ", sort);
          setSort("firstname");
          console.log("after set ", sort);
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
  const changePage = direction => {
    if (direction === "back") {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next") {
      setCurrentPage(currentPage + 1);
    }
  };
  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = users.data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  if (users.data.length === 0) {
    return <p>Loading data...</p>;
  }
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
