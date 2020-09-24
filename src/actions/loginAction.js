import { AUTH_CONST } from "./actionTypes";
import {
  AXIOS_INSTANCE,
  LOGIN_API,
  CONFIG,
} from "./apiEndPoints";
import { checkHttpStatus, parseJSON, handleLoginRedirect } from "../utils";
import * as base from "./baseAction";

export function loginSubmit(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(AUTH_CONST.LOGIN_REQUEST));
    formData.grant_type = "Bearer";
    AXIOS_INSTANCE.post(`${LOGIN_API}/token`, formData, CONFIG)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        // console.log(result);
        if (result.isSuccess) {
          // console.log(result.data.token);
          AXIOS_INSTANCE.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${result.data.token}`;
          handleLoginRedirect(result.data.token);
          dispatch(
            base.getSuccess(AUTH_CONST.LOGIN_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(AUTH_CONST.LOGIN_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        console.log('error', error);
        checkHttpStatus(error.response);
        // dispatch(
        //     base.getFailure(AUTH_CONST.LOGIN_FAILURE, {
        //         error: {
        //             data: error.response ? error.response : null,
        //         },
        //     })
        // );
      });
  };
}

// Logout
export function userLogout(formData) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foGRCAuthToken")),
    },
  };
  console.log(formData);
  return (dispatch) => {
    dispatch(base.getRequest(AUTH_CONST.LOGOUT_REQUEST));
    AXIOS_INSTANCE.post(`${LOGIN_API}/LogOut`, formData, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(AUTH_CONST.LOGOUT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(AUTH_CONST.LOGOUT_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        // if(error && error.response){
        checkHttpStatus(error.response);
        //     if(error.response.status!= 404)
        //     dispatch(
        //         base.getFailure(AUTH_CONST.LOGOUT_FAILURE, {
        //             error: {
        //                 data: error.response ? error.response.data : null,
        //             },
        //         })
        //     );
        // } else {
        //     window.location.href = "/pages/error-page";
        // }

      });
  };
}
