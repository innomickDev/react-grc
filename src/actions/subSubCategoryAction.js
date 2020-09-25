import { SUB_SUB_CATEGORY_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, SUB_SUB_CATEGORY_API, CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

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
        checkHttpStatus(error.response);
      });
  };
}
