import * as actionType from "../actions/ActionType";

const initialState = {
  login: [],
  loggedIn: false,
  isError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        login: action.loginDetails,
        loggedIn: true,
      };

    case actionType.LOGIN_FAIL:
      return {
        ...state,
        isError: true,
      };

    case actionType.LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };

    default:
      return state;
  }
};

export default reducer;
