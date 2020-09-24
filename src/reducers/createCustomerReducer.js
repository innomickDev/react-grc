/* eslint-disable default-case */
import { CREATE_CUSTOMER_CONST } from "../actions/actionTypes";
export default function reducer(
    state = {

    },
    action
) {
    switch (action.type) {
        case CREATE_CUSTOMER_CONST.POST_CREATE_CUSTOMER_REQUEST:
            return {
                customerRegistration: null,
                customerRegistrationFail: null
            };
        case CREATE_CUSTOMER_CONST.POST_CREATE_CUSTOMER_SUCCESS:
            return {
                customerRegistration: action.payload.response.data.isSuccess ? true : false,
                customerRegistrationFail: null
            };
        case CREATE_CUSTOMER_CONST.POST_CREATE_CUSTOMER_FAILURE:
            // console.log(action.payload.response.data.error.errorDescription);
            return {
                customerRegistration: null,
                customerRegistrationFail: action.payload.response.data.error.errorDescription
            };
    }

    return state;
}
