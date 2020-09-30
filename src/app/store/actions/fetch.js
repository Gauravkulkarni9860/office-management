import * as actionType from "./ActionType";
import axios from "../../utils/axios";

export const departmentFetchSuccess = (department) => {
  return {
    type: actionType.FETCH_DEPARTMENTS,
    department: department,
  };
};

export const fetchDepartment = (token) => {
  return (dispatch) => {
    axios
      .get("/department", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        dispatch(departmentFetchSuccess(response.data));
      });
  };
};

export const fetchCastsSuccess = (casts) => {
  return {
    type: actionType.FETCH_CASTS,
    castList: casts,
  };
};

export const fetchCasts = (token) => {
  return (dispatch) => {
    axios
      .get("/visitor/cast/subcast", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        dispatch(fetchCastsSuccess(response.data));
      });
  };
};

export const fetchAdhikariList = (data) => {
  return {
    type: actionType.FETCH_OFFICER_LIST,
    officerList: data[0],
  };
};

export const fetchAdhikari = (token) => {
  const payload = { page: { number: 0, size: 10 } };
  return (dispatch) => {
    axios
      .post(
        "/adhikari/list",
        { payload },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => dispatch(fetchAdhikariList(response.data)));
  };
};

export const fetchCount = (count) => {
  return {
    type: actionType.FETCH_COUNT,
    count: count,
  };
};

export const fetchOfficerCount = (token) => {
  return (dispatch) => {
    axios
      .get("/adhikari/total/count", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => dispatch(fetchCount(response.data)));
  };
};
