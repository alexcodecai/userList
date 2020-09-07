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

export function updateUser(id,payload) {
  return dispatch => {
    dispatch(requestStart());
    axios
      .put(`/api/users/update/${id}`, payload)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}
