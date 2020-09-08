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

export function getUsersSorted(name) {
  return dispatch => {
    dispatch(requestStart());
    let api = `/api/users`;
    if (name !== "") {
      api = `/api/users/sort/${name}`;
    }
    axios
      .get(api)
      .then(response => {
        dispatch(requestSuccess(response.data));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}


