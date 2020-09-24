// import { browserHistory } from "react-router";
// import { createBrowserHistory } from "history";
// import namor from "namor";

import {showError} from "../helpers";

export function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action.payload) : state;
  };
}

// export function checkHttpStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   } else {
//     var error = new Error(response.statusText);
//     error.response = response;
//     throw error;
//   }
// }

export function checkHttpStatus(response) {
  if(response){
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else if (response.status === 401) {
      localStorage.clear();
      window.location.href = "#/pages/login";
    } else if (response.status === 404) {
      // window.location.href = "#/pages/error-page";
      return true;
      // showError("Something is wrong! Please contact your administration")
      // return false;
    } else if (response.status === 500 || response.status === 501) {
      // window.location.href = "#/pages/error-page";
      return true;
    }
    else {
      var error = new Error(response.statusText);
      error.response = response;
      // window.ononline
      return error;
    }
  } else {
    // window.location.href = "#/pages/error-page";
    return true;
  }

}

export function handleLoginRedirect(token) {
  localStorage.setItem("foGRCAuthToken", JSON.stringify("Bearer " + token));
}

export function handleLogoutRedirect() {
  localStorage.clear();
  window.location.href = "#/pages/login";
}

export function parseJSON(response) {
  return response.data;
}
export const errorCode = {
  authenticationError: 403,
  InternalServerError: 500,
};

export const successCode = {
  successStatusCode: 200,
};

export const LANG_CODES = {
  french: "fr-FR",
  english: "en-US",
  arabic: "ar-MA",
};

export const createQueryString = (objParam) => {
  const queryString = Object.keys(objParam)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(objParam[k])}`)
    .join("&");
  return queryString;
};
