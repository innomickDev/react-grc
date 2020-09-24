import { SUB_CATEGORY_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, SUB_CATEGORY_API, CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";
import {showError} from "../helpers";

// action for Change password
export function getSubCategories() {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(SUB_CATEGORY_CONST.GET_SUB_CATEGORY_REQUEST));
    AXIOS_INSTANCE.get(`${SUB_CATEGORY_API}/GetSubCategories`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(SUB_CATEGORY_CONST.GET_SUB_CATEGORY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(SUB_CATEGORY_CONST.GET_SUB_CATEGORY_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
          if(error && error.response) {
              checkHttpStatus(error.response);
              dispatch(
                  base.getFailure(SUB_CATEGORY_CONST.GET_SUB_CATEGORY_FAILURE, {
                      error: {
                          data: error.response ? error.response.data : null,
                      },
                  })
              );
          } else {
              showError("Please Check Your Internet connection");
          }
      });
  };
}

export function getSubCategoriesByCategory(categoryCode) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(
      base.getRequest(SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_C_ID_REQUEST)
    );
    AXIOS_INSTANCE.get(
      `${SUB_CATEGORY_API}/GetSubCategoryByCategoryCode?categoryCode=${categoryCode}`,
      HEADER
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(
              SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_C_ID_SUCCESS,
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
              SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_C_ID_FAILURE,
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
          //     if(error.response.status!= 404) {
          //         dispatch(
          //             base.getFailure(SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_C_ID_FAILURE, {
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
