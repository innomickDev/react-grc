import { TARIF_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, CONFIG, TARIF_API } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

//get Traif action
export function getTarif() {
  return (dispatch) => {
    dispatch(base.getRequest(TARIF_CONST.GET_TARIFS_REQUEST));
    AXIOS_INSTANCE.post(`${TARIF_API}/GetTarifs`, CONFIG)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(TARIF_CONST.GET_TARIFS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(TARIF_CONST.GET_TARIFS_FAILURE, {
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
