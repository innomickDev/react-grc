import { CLAIM } from "./actionTypes";
import { AXIOS_INSTANCE, CREATE_CLAIM_API, CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON, handleLoginRedirect } from "../utils";
import * as base from "./baseAction";
import {showError} from "../helpers";

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
                // if(error && error.response) {
                    checkHttpStatus(error.response);
                //     if(error.response.status!= 404) {
                //         dispatch(
                //             base.getFailure(CLAIM.CREATE_CLAIM_FAILURE, {
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
