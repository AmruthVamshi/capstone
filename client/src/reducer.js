export const initialState = {
  search:'',
  user: null,
};
export const actionTypes = {
  SET_DONOR: "SET_DONOR",
  SET_HEADMASTER: "SET_HEADMASTER",
  LOGOUT:"LOGOUT",
  SET_SEARCH:"SET_SEARCH"
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
    case actionTypes.SET_SEARCH:
      return{
        ...state,
        search:action.search
      }    
    default:
      return state;
  }
};
export default reducer;
