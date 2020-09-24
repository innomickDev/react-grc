import { SUB_SUB_CATEGORY_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, SUB_SUB_CATEGORY_API, CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";
import {showError} from "../helpers";

// action for Change password
export function getSubSubCategories(formData) {
  return (dispatch) => {
    dispatch(
      base.getRequest(SUB_SUB_CATEGORY_CONST.GET_SUB_SUB_CATEGORY_REQUEST)
    );
    AXIOS_INSTANCE.get(
      `${SUB_SUB_CATEGORY_API}/GetSubSubCategories`,
      formData,
      CONFIG
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(
              SUB_SUB_CATEGORY_CONST.GET_SUB_SUB_CATEGORY_SUCCESS,
              {
                response: {
                  data: result,
                },
              }
            )
          );
        } else {
          dispatch(
            base.getFailure(
              SUB_SUB_CATEGORY_CONST.GET_SUB_SUB_CATEGORY_FAILURE,
              {
                response: {
                  data: result,
                },
              }
            )
          );
        }
      })
      .catch((error) => {
          // if(error && error.response) {
              checkHttpStatus(error.response);
              // if(error.response.status!= 404) {
          //         dispatch(
          //             base.getFailure(SUB_SUB_CATEGORY_CONST.GET_SUB_SUB_CATEGORY_FAILURE, {
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
