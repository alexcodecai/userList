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

export function updateUser(id, payload, history) {
  return dispatch => {
    dispatch(requestStart());
    axios
      .put(`/api/users/update/${id}`, payload)
      .then(response =>{
          history.push('/')
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}
