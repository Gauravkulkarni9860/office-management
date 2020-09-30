import * as actionType from "../actions/ActionType";

const initialstate = {
  department: [],
  casts: [],
  subCast: [],
};

const generalRducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionType.FETCH_DEPARTMENTS:
      return {
        ...state,
        department: action.department,
      };
    case actionType.FETCH_CASTS:
      let subcast = action.castList.map((cast) => {
        return { name: cast.name, subcast: cast.subcast };
      });
      return {
        ...state,
        casts: action.castList,
        subCast: subcast,
      };
    default:
      return state;
  }
};

export default generalRducer;
