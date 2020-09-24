import { CATEGORY_CONST } from "./actionTypes";
import {
  AXIOS_INSTANCE,
  CATEGORY_API,
  } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

// action for Change password
export function getCategories() {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CATEGORY_CONST.GET_CATEGORY_REQUEST));
    AXIOS_INSTANCE.get(`${CATEGORY_API}/GetCategories`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CATEGORY_CONST.GET_CATEGORY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CATEGORY_CONST.GET_CATEGORY_FAILURE, {
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
          //     dispatch(
          //         base.getFailure(CATEGORY_CONST.GET_CATEGORY_FAILURE, {
          //             error: {
          //                 data: error.response ? error.response.data : null,
          //             },
          //         })
          //     );
          // } else {
          //     showError("Please Check Your Internet connection");
          // }
      });
  };
}
