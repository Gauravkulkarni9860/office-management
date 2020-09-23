import * as actionType from "./ActionType";
import axios from "axios";

export const loginUser = (login) => {
  return {
    type: actionType.LOGIN_SUCCESS,
    loginDetails: login,
  };
};

export const loginRequest = (username, password) => {
  return (dispatch) => {
    axios
      .post("https://staging.api.fusionloopsolution.com/user/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        dispatch(loginUser(response.data));
      })
      .catch((error) => {
        dispatch(loginFail());
      });
  };
};

export const loginFail = () => {
  return {
    type: actionType.LOGIN_FAIL,
  };
};
