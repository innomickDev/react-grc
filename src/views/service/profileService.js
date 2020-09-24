import {ACCOUNT_API, AXIOS_INSTANCE, CONFIG} from "../../actions/apiEndPoints";
import {checkHttpStatus, parseJSON} from "../../utils";
import * as base from "../../actions/baseAction";
import {ACCOUNT_CONST} from "../../actions/actionTypes";

/**
 * user list service.
 */
export default function getUserProfileData(dispatch) {
    return  AXIOS_INSTANCE.get(`${ACCOUNT_API}/MyProfile`, CONFIG)
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((result) => {
            if (result.isSuccess) {
                localStorage.setItem("foGRCUserProfileData", JSON.stringify(result));
                dispatch(
                    base.getSuccess(ACCOUNT_CONST.MY_PROFILE_SUCCESS, {
                        response: {
                            data: result,
                        },
                    })
                );
                return result;
            } else {
                dispatch(
                    base.getFailure(ACCOUNT_CONST.MY_PROFILE_FAILURE, {
                        response: {
                            data: result,
                        },
                    })
                );
            }
            return result;
        })
        .catch((error) => {
            checkHttpStatus(error.response);
            return error
        });
}