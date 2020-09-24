import { SUB_CATEGORY_CONST } from "../actions/actionTypes";
export default function reducer(state = {}, action) {
  switch (action.type) {
    case SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_C_ID_REQUEST:
      return {
        ...state,
        subCategoryDataByCategory: null,
        isNoSubCategory: null
      };
    case SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_C_ID_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        subCategoryDataByCategory: action.payload.response
          ? action.payload.response.data.data
          : [],
        isNoSubCategory: null
      };
    case SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_C_ID_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        subCategoryDataByCategory: null,
        isNoSubCategory: action.payload.response.data.error.errorDescription
      };
  }
  return state;
}
