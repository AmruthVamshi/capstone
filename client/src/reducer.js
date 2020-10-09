export const initialState = {
  user: null,
};
export const actionTypes = {
  SET_DONOR: "SET_DONOR",
  SET_HEADMASTER: "SET_HEADMASTER",
  LOGOUT:"LOGOUT"
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_DONOR:
      return {
        ...state,
        donor: action.donor,
      };
    case actionTypes.SET_HEADMASTER:
      return {
        ...state,
        headmaster: action.headmaster
      }
    case actionTypes.LOGOUT:
      return{
        ...state,
        donor:null,
        headmaster:null
      }    
    default:
      return state;
  }
};
export default reducer;
