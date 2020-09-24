import { STATION_CONST } from "./actionTypes";
import {
  AXIOS_INSTANCE,
  STATION_API,
  } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

export function getStations() {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foGRCAuthToken")),
    },
  };
  return (dispatch) => {
    // console.log(AXIOS_INSTANCE.defaults.headers.common["Authorization"]);
    // AXIOS_INSTANCE.defaults.headers.common["Content-Type"] = "application/json";
    AXIOS_INSTANCE.defaults.headers.common["Authorization"] = JSON.parse(
      localStorage.getItem("foGRCAuthToken")
    );
    dispatch(base.getRequest(STATION_CONST.GET_STATION_REQUEST));
    AXIOS_INSTANCE.post(`${STATION_API}/GetStations`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(STATION_CONST.GET_STATION_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(STATION_CONST.GET_STATION_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
          // if(error && error.response) {
              checkHttpStatus(error.response);
          //     if(error.response.status!= 404) {
          //         dispatch(
          //             base.getFailure(STATION_CONST.GET_STATION_FAILURE, {
          //                 error: {
          //                     data: error.response ? error.response.data : null,
          //                 },
          //             })
          //         );
          //     }
          // } else {
          //     window.location.href = "/pages/error-page";
          //     // showError("Please Check Your Internet connection");
          // }

      });
  };
}
