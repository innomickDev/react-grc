import { TRAIN_TYPE_CONST } from "./actionTypes";
import {
  AXIOS_INSTANCE,
  CONFIG,
  TRAIN_TYPE_API,
} from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

//getTrainType
export function getTrainType() {
  return (dispatch) => {
    dispatch(base.getRequest(TRAIN_TYPE_CONST.GET_TRAIN_TYPES_REQUEST));
    AXIOS_INSTANCE.post(`${TRAIN_TYPE_API}/GetTraintTypes`, CONFIG)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(TRAIN_TYPE_CONST.GET_TRAIN_TYPES_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(TRAIN_TYPE_CONST.GET_TRAIN_TYPES_FAILURE, {
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
        //             base.getFailure(TRAIN_TYPE_CONST.GET_TRAIN_TYPES_FAILURE, {
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
