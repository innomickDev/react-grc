/* eslint-disable default-case */
import { AUTH_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    isAuthenticated: false,
    isAuthenticating: false,
    loginError: null,
  },
  action
) {
  switch (action.type) {
    case AUTH_CONST.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
        isAuthenticated: false,
        loginSuccess: null,
        loginError: null,
      };
    case AUTH_CONST.LOGIN_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
        loginSuccess: action.payload.response.data.isSuccess ? true : false,
        loginError: null,
      };
    case AUTH_CONST.LOGIN_FAILURE:
      // console.log('failureeeee',action.payload.response.data.error.errorDescription);
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        loginSuccess: null,
        loginError: action.payload
          ? action.payload.response.data.error.errorDescription
          : "",
      };

    // Logout user
    case AUTH_CONST.LOGOUT_REQUEST:
      return {
        ...state,
        logoutSuccess: null,
        logoutError: null,
      };
    case AUTH_CONST.LOGOUT_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        logoutSuccess: action.payload.response.data.isSuccess ? true : false,
        logoutError: null,
      };
    case AUTH_CONST.LOGOUT_FAILURE:
      // console.log(action.payload);
      // console.log(action.payload.response.data.error.errorDescription);
      return {
        ...state,
        logoutSuccess: null,
        logoutError: action.payload
          ? action.payload.response.data.error.errorDescription
          : null,
      };
  }

  return state;
}
