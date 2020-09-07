const initState = { isLoading: false, error: "", data: [] };

const getSingleUser = (state = initState, action) => {
  switch (action.type) {
    case "REQUEST_GETSINGLEUSER_START":
      return {
        ...state,
        isLoading: true
      };
    case "REQUEST_GETSINGLEUSER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.user
      };
    case "REQUEST_GETSINGLEUSER_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default getSingleUser;
