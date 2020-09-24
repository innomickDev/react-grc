import { ACCOUNT_CONST } from "../actions/actionTypes";
export default function reducer(state = {}, action) {
  switch (action.type) {
    case ACCOUNT_CONST.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isForgotPassword: null,
        forgotPasswordFail: null,
        confirmForgottenPassword: null,
        confirmForgottenPassFail: null
      };
    case ACCOUNT_CONST.FORGOT_PASSWORD_SUCCESS:
      //   console.log(action.payload);
      // console.log(action.payload.response.data.isSuccess ? true : false)
      return {
        ...state,
        isForgotPassword: action.payload.response.data.isSuccess ? true : false,
        forgotPasswordFail: null,
      };
    case ACCOUNT_CONST.FORGOT_PASSWORD_FAILURE:
      //   console.log(action.payload);
      return {
        ...state,
        isForgotPassword: null,
        forgotPasswordFail: action.payload.response.data.error.errorDescription,
      };

    //confirm forgotton  password
    case ACCOUNT_CONST.CONFIRM_F_PASSWORD_REQUEST:
      return {
        ...state,
        confirmForgottenPassword: null,
        confirmForgottenPassFail: null,
      };
    case ACCOUNT_CONST.CONFIRM_F_PASSWORD_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        confirmForgottenPassword: action.payload.response.data.isSuccess ? true : false,
        confirmForgottenPassFail: null
      };
    case ACCOUNT_CONST.CONFIRM_F_PASSWORD_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        confirmForgottenPassword: null,
        confirmForgottenPassFail:
          action.payload.response.data.error.errorDescription
      };

    //confirm forgotton  password
    case ACCOUNT_CONST.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePassword: null,
        changePassFail: null,
      };
    case ACCOUNT_CONST.CHANGE_PASSWORD_SUCCESS:
      //   console.log(action.payload);
      return {
        ...state,
        changePassword: action.payload.response.data.isSuccess ? true : false,
        changePassFail: null,
      };
    case ACCOUNT_CONST.CHANGE_PASSWORD_FAILURE:
      //   console.log(action.payload);
      return {
        ...state,
        changePassword: null,
        changePassFail: action.payload.response.data.error.errorDescription,
      };
    case ACCOUNT_CONST.MY_PROFILE_REQUEST:
      return {
        ...state,
        isMyProfileSuccess: null,
        isMyProfileData: null,
      };
    case ACCOUNT_CONST.MY_PROFILE_SUCCESS:
      return {
        ...state,
        isMyProfileSuccess: null,
        isMyProfileData: action.payload ? action.payload.response.data.data : {},
      }
    case ACCOUNT_CONST.MY_PROFILE_FAILURE:
      return {
        ...state,
        isMyProfileSuccess: null,
        isMyProfileData: action.payload.response.data.error.errorDescription,
      }

  }
  return state;
}
