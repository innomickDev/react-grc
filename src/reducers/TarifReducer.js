import { TARIF_CONST } from "../actions/actionTypes";
export default function reducer(state = {}, action) {
  switch (action.type) {
    case TARIF_CONST.GET_TARIFS_REQUEST:
      return {
        ...state,
        getTarifData: null,
      };
    case TARIF_CONST.GET_TARIFS_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        getTarifData: action.payload.response
          ? action.payload.response.data.data
          : [],
      };
    case TARIF_CONST.GET_TARIFS_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        getTarifData: null,
      };
  }
  return state;
}
