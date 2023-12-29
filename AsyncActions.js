const redux = require("redux");
const createStore = redux.createStore;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEDED = "FETCH_USERS_SUCCEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUESTED,
  };
}
function fetchUsersSucceded(users) {
  return {
    type: FETCH_USERS_SUCCEDED,
    payload: users,
  };
}
function fetchUsersFailed(error) {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
}

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);