import { STATION_CONST } from "../actions/actionTypes";
export default function reducer(state = {}, action) {
  switch (action.type) {
    case STATION_CONST.GET_STATION_REQUEST:
      return {
        ...state,
        stationData: null,
      };
    case STATION_CONST.GET_STATION_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        stationData: action.payload ? action.payload.response.data.data : [],
      };
    case STATION_CONST.GET_STATION_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        stationData: null,
      };
  }
  return state;
}
