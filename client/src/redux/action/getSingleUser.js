import axios from "axios";

function requestStart() {
  return {
    type: "REQUEST_GETSINGLEUSER_START"
  };
}

function requestSuccess(user) {
  return {
    type: "REQUEST_GETSINGLEUSER_SUCCESS",
    user
  };
}

function requestFail(error) {
  return {
    type: "REQUEST_GETSINGLEUSER_FAIL",
    error
  };
}

export function getSingleUser(id) {
  return dispatch => {
    dispatch(requestStart());
    axios
      .get(`/api/users/${id}`)
      .then(response => {
        console.log(response.data)
        dispatch(requestSuccess(response.data));
        console.log(response.data)
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}
