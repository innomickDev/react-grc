import { ACCOUNT_CONST } from "./actionTypes";
import {
  AXIOS_INSTANCE,
  ACCOUNT_API,
  CONFIG,
  LOGIN_CONFIG,
} from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

// action for forgot password api
export function forgotPassword(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.FORGOT_PASSWORD_REQUEST));
    AXIOS_INSTANCE.get(
      `${ACCOUNT_API}/ForgotPassword?email=${formData.email}`,
      LOGIN_CONFIG
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.FORGOT_PASSWORD_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.FORGOT_PASSWORD_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        // dispatch(
        //   base.getFailure(ACCOUNT_CONST.FORGOT_PASSWORD_FAILURE, {
        //     error: {
        //       data: error,
        //     },
        //   })
        // );
      });
  };
}

// action for confirmForgottenPassword api (before login)
export function confirmForgottenPassword(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.CONFIRM_F_PASSWORD_REQUEST));
    AXIOS_INSTANCE.post(`${ACCOUNT_API}/ConfirmForgottenPassword`, formData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.CONFIRM_F_PASSWORD_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.CONFIRM_F_PASSWORD_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        // dispatch(
        //   base.getFailure(ACCOUNT_CONST.CONFIRM_F_PASSWORD_FAILURE, {
        //     error: {
        //       data: error.response ? error.response.data : null,
        //     },
        //   })
        // );
      });
  };
}

// action for MyProfile
export function myProfile() {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.CONFIRM_F_PASSWORD_REQUEST));
    AXIOS_INSTANCE.get(`${ACCOUNT_API}/MyProfile`, CONFIG)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          localStorage.setItem("foGRCUserProfileData", JSON.stringify(result));
          dispatch(
            base.getSuccess(ACCOUNT_CONST.CONFIRM_F_PASSWORD_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.CONFIRM_F_PASSWORD_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        // dispatch(
        //   base.getFailure(ACCOUNT_CONST.CONFIRM_F_PASSWORD_FAILURE, {
        //     error: {
        //       data: error.response ? error.response.data : null,
        //     },
        //   })
        // );
      });
  };
}

// action for Change password
export function changePassword(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.CHANGE_PASSWORD_REQUEST));
    AXIOS_INSTANCE.post(`${ACCOUNT_API}/ChangePassword`, formData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.CHANGE_PASSWORD_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.CHANGE_PASSWORD_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        // dispatch(
        //   base.getFailure(ACCOUNT_CONST.CHANGE_PASSWORD_FAILURE, {
        //     error: {
        //       data: error.response ? error.response.data : null,
        //     },
        //   })
        // );
      });
  };
}
