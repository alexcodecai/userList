import axios from "axios";

function requestStart() {
  return {
    type: "REQUEST_USERS_START"
  };
}

function requestSuccess(users) {
  return {
    type: "REQUEST_USERS_SUCCESS",
    users
  };
}

function requestFail(error) {
  return {
    type: "REQUEST_USERS_FAIL",
    error
  };
}

export function removeUser(condition, id) {
  let sort = condition.sort;
  let searchInput = condition.searchInput
  return dispatch => {
    dispatch(requestStart());
    axios
      .delete(`http://localhost:5000/api/users/deleteone/${id}`)
      .then(() => {
        if (sort === "" && searchInput === "") {
          axios.get('/api/users')
            .then((response) => {
              dispatch(requestSuccess(response.data))
            })
        }
        else if (searchInput === ""){
          axios.get(`/api/users/sort/${sort}`)
          .then((response) => {
            dispatch(requestSuccess(response.data))
          })
        } else if (sort === "") {
          axios.get(`/api/users/serach/${searchInput}`)
          .then((response) => {
            dispatch(requestSuccess(response.data))
          })
        } else {
          axios.get(`api/users/serach/${condition}`)
        }
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}
