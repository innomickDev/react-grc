import { CATEGORY_CONST } from "../actions/actionTypes";
export default function reducer(state = {}, action) {
  switch (action.type) {
    case CATEGORY_CONST.GET_CATEGORY_REQUEST:
      return {
        ...state,
        categoryData: null,
      };
    case CATEGORY_CONST.GET_CATEGORY_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        categoryData: action.payload ? action.payload.response.data.data : [],
      };
    case CATEGORY_CONST.GET_CATEGORY_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        categoryData: null,
      };
  }
  return state;
}
