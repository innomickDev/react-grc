import { CLAIM } from "./actionTypes";
import { AXIOS_INSTANCE, CREATE_CLAIM_API, CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON, handleLoginRedirect } from "../utils";
import * as base from "./baseAction";

export function createClaim(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM.CREATE_CLAIM_REQUEST));
    formData.grant_type = "Bearer";
    AXIOS_INSTANCE.post(`${CREATE_CLAIM_API}`, formData, CONFIG)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          AXIOS_INSTANCE.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${result.data.token}`;
          handleLoginRedirect(`${result.data.token}`, result);
          dispatch(
            base.getSuccess(CLAIM.CREATE_CLAIM_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM.CREATE_CLAIM_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
      });
  };
}
