import { TRAIN_TYPE_CONST } from "../actions/actionTypes";
export default function reducer(state = {}, action) {
  switch (action.type) {
    case TRAIN_TYPE_CONST.GET_TRAIN_TYPES_REQUEST:
      return {
        ...state,
        getTrinType: null,
      };
    case TRAIN_TYPE_CONST.GET_TRAIN_TYPES_SUCCESS:
      return {
        ...state,
        getTrinType: action.payload.response
          ? action.payload.response.data.data.listClassification
          : [],
      };
    case TRAIN_TYPE_CONST.GET_TRAIN_TYPES_FAILURE:
      return {
        ...state,
        getTrinType: null,
      };
  }
  return state;
}
