/* eslint-disable default-case */
import { SEARCH_CUSTOMER_DATA } from "../actions/actionTypes";
export default function reducer(
    state = {

    },
    action
) {
    switch (action.type) {
        case SEARCH_CUSTOMER_DATA.GET_CUSTOMER_REQUEST:
            return {
                isGetCustomer: null,
                isGetCustomerFail: null
            };
        case SEARCH_CUSTOMER_DATA.GET_CUSTOMER_SUCCESS:
            return {
                isGetCustomer: action.payload.response ? action.payload.response.data.data : [],
                isGetCustomerFail: null
            };
        case SEARCH_CUSTOMER_DATA.GET_CUSTOMER_FAILURE:
            return {
                isGetCustomerFail: action.payload.response ? action.payload.response.data.error.errorDescription: [],
                isGetCustomer: null

            };


    }

    return state;
}
