import axios from "../../utils/axios";
import * as actionType from "./ActionType";

export const submitOfficerSuccess = (officerData) => {
  return {
    type: actionType.ADD_OFFICER_SUCCESS,
    officerData: officerData,
  };
};

export const submitOfficerRequest = (data, token) => {
  return (dispatch) => {
    axios
      .post(
        "/adhikari",
        {
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          phone: data.phone,
          dob: data.dob,
          email: data.email,
          gender: data.gender,
          department: data.department,
          designation: data.designation,
          cast: data.cast,
          subcast: data.subcast,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => dispatch(submitOfficerSuccess(data)));
  };
};

export const getItems = (id, token) => {
  return (dispatch) => {
    axios
      .get("/adhikari/" + id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => dispatch(deleteItem(response.data, id, token)));
  };
};

export const deleteItem = (data, id, token) => {
  return (dispatch) => {
    axios
      .put(
        "/adhikari/" + id,
        {
          cast: data.cast,
          complains: data.complains,
          createdBy: data.createdBy,
          createdDate: data.createdDate,
          department: data.department,
          designation: data.designation,
          dob: data.dob,
          email: data.email,
          firstName: data.firstName,
          gender: data.gender,
          id: data.id,
          lastName: data.lastName,
          middleName: data.middleName,
          phone: data.phone,
          recordStatus: "DELETED",
          subcast: data.subcast,
          updatedBy: data.updatedBy,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
  };
};

export const getDetailsToEdit = (data) => {
  return {
    type: actionType.GET_DETAILS,
    details: data,
  };
};

export const editItem = (id, token) => {
  return (dispatch) => {
    axios
      .get("/adhikari/" + id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => dispatch(getDetailsToEdit(response.data)));
  };
};
