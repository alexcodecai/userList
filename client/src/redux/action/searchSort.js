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

export function getUsersSearchAndSort(payload) {
   let sort = payload.sort;
   let searchInput = payload.searchInput
  console.log(payload.sort, '++++', payload.searchInput)
  return dispatch => {
    dispatch(requestStart());
    let api = `/api/users`;
    if (payload.sort !== "" || payload.searchInput !== "") {
      api = `/api/users/combine/${sort}-${searchInput}`;
    }
    axios
      .get(api, payload)
      .then(response => {
        console.log(payload)
        dispatch(requestSuccess(response.data));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}


