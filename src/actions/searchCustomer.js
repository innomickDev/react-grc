import { SEARCH_CUSTOMER_DATA } from "./actionTypes";
import { AXIOS_INSTANCE, SEARCH_CUSTOMER_API } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

export function searchCustomerDetails(formData) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foGRCAuthToken")),
    },
  };
  const email = formData.email;
  return (dispatch) => {
    dispatch(base.getRequest(SEARCH_CUSTOMER_DATA.GET_CUSTOMER_REQUEST));
    AXIOS_INSTANCE.get(
      `${SEARCH_CUSTOMER_API}/GetCustomer?userEmail=${email}`,
      HEADER
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(SEARCH_CUSTOMER_DATA.GET_CUSTOMER_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(SEARCH_CUSTOMER_DATA.GET_CUSTOMER_FAILURE, {
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
