import * as actionType from "../actions/ActionType";
import axios from "axios";

export const loginUser = (login) => {
  return {
    type: actionType.LOGIN_SUCCESS,
    loginDetails: login,
  };
};

export const loginRequest = (credentials) => {
  //   console.log(credentials);
  return (dispatch) => {
    axios
      .post("https://staging.api.fusionloopsolution.com/user/auth/login", {
        username: credentials.userName,
        password: credentials.password,
      })
      .then((response) => {
        dispatch(loginUser(response.data));
        alert("Login Successfull...!");
      })
      .catch((error) => {
        dispatch(loginFail())
        // alert("Error: Login Failed...! Incorrect id or password");
      });
  };
};

export const loginFail = () => {
  return {
    type: actionType.LOGIN_FAIL,
  };
};
