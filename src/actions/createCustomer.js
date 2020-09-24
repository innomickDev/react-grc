import { CREATE_CUSTOMER_CONST } from "./actionTypes";
import {
  AXIOS_INSTANCE,
  CUSTOMER_REGISTRATION_API,
  CONFIG,
} from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

export function createCustomer(formData) {
  return (dispatch) => {
    dispatch(
      base.getRequest(CREATE_CUSTOMER_CONST.POST_CREATE_CUSTOMER_REQUEST)
    );
    AXIOS_INSTANCE.post(
      `${CUSTOMER_REGISTRATION_API}/CustomerRegistration`,
      formData,
      CONFIG
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          // console.log('isSuccess', result);
          dispatch(
            base.getSuccess(
              CREATE_CUSTOMER_CONST.POST_CREATE_CUSTOMER_SUCCESS,
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
              CREATE_CUSTOMER_CONST.POST_CREATE_CUSTOMER_FAILURE,
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
        //     dispatch(
        //         base.getFailure(CREATE_CUSTOMER_CONST.POST_CREATE_CUSTOMER_FAILURE, {
        //             error: {
        //                 data: error.response ? error.response.data : null,
        //             },
        //         })
        //     );
        // }
        // } else {
        //     window.location.href = "/pages/error-page";
        //     // showError("Please Check Your Internet connection");
        // }
      });
  };
}
