import axios from "axios";

function requestStart() {
  return {
    type: "REQUEST_USERS_START"
  };
}

function requestFail(error) {
  return {
    type: "REQUEST_USERS_FAIL",
    error
  };
}

export function addUser(payload) {
  return dispatch => {
    dispatch(requestStart());
    axios
      .post("/api/users", payload)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}
