import { checkHttpStatus } from "../utils";

// handle state when request is send and response is awaited
export function getRequest(REQUEST) {
  return {
    type: REQUEST,
  };
}
// handle state and redirection if user is successfully logged in
export function getSuccess(SUCCESS, data) {
  return {
    type: SUCCESS,
    payload: data,
  };
}
// handle state when reset is send and resposen is awaited
export function reset(RESET) {
  return {
    type: RESET,
  };
}
// handle state in case of failure of user login
export function getFailure(FAILURE, error) {
  return {
    type: FAILURE,
    payload: error,
  };
}

export function handleCatch(failure, error) {
  // console.log(error.message);
  if (
    error.message === "Network Error" ||
    error.message === "Request failed with status code 500"
  ) {
    return getFailure(failure, {
      response: {
        error: {
          error: "string",
          errorDescription: error.message,
        },
      },
    });
  }
  const errorData = checkHttpStatus(error.response);
  // console.log(errorData);

  return getFailure(failure, {
    response: {
      error: {
        error: "string",
        errorDescription: errorData,
      },
    },
  });
}
