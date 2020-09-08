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

export function searchUsers(input) {
  return dispatch => {
    dispatch(requestStart());
    let api = '/api/users'
    if (input !== "") {
      api = `/api/users/serach/${input}`;
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



// export function searchUsers(sort, name) {
//   return (dispatch, getState) => {
//     dispatch(requestStart());
//     axios.get(`/api/users/search/${sort}-${name}`)
//       .then(response => {
//         dispatch(requestSuccess(response.data));
//       })
//       .catch(err => {
//         dispatch(requestFail(err));
//       });
//   };
// }