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

export function removeUser(id, sort) {
  return dispatch => {
    dispatch(requestStart());
    axios
      .delete(`http://localhost:5000/api/users/deleteone/${id}`)
      .then(() => {
        console.log("removeuser in action is ", sort)
        if (sort === "") {
          return axios.get(`http://localhost:5000/api/users`)

        }

        return axios.get(`http://localhost:5000/api/users/sort/${sort}`)
      })
      .then(response => {
        dispatch(requestSuccess(response.data));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}
