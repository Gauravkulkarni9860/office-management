import * as actionType from "../actions/ActionType";

const initialState = {
  officerList: [],
  sentData: [],
  editData: null,
  isEdit: false,
  count: null,
  deleteItem: [],
};

const officer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_COUNT:
      return {
        ...state,
        count: action.count,
      };
    case actionType.FETCH_OFFICER_LIST:
      return {
        ...state,
        officerList: action.officerList,
      };
    case actionType.ADD_OFFICER_SUCCESS:
      return {
        ...state,
        sentData: action.officerData,
      };
    case actionType.GET_DETAILS:
      return {
        ...state,
        editData: action.details,
        isEdit: true,
      };
    default:
      return state;
  }
};

export default officer;
