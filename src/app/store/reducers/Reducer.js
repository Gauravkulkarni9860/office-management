import * as actionType from "../actions/ActionType";

const initialState = {
  login: [],
  loggedIn: false,
  isError: false,
};

const loginSuccess = (state, action) => {
  return {
    ...state,
    login: action.loginDetails,
    loggedIn: true,
  };
};

const loginFail = (state, action) => {
  return {
    ...state,
    isError: true,
  };
};

const logOUt = (state, action) => {
  return {
    ...state,
    loggedIn: false,
    isError: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN_SUCCESS:
      return loginSuccess(state, action);

    case actionType.LOGIN_FAIL:
      return loginFail(state, action);

    case actionType.LOGOUT:
      return logOUt(state, action);

    default:
      return state;
  }
};

export default reducer;
