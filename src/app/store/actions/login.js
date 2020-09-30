import * as actionType from "./ActionType";
import axios from "../../utils/axios";

export const loginUser = (login) => {
  return {
    type: actionType.LOGIN_SUCCESS,
    loginDetails: login,
  };
};

export const loginRequest = (credentials) => {
  return (dispatch) => {
    axios
      .post("/user/auth/login", {
        username: credentials.username,
        password: credentials.password,
      })
      .then((response) => {
        dispatch(loginUser(response.data));
        alert("Login successfull...");
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
