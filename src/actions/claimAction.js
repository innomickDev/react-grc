import { CLAIM } from "./actionTypes";
import { AXIOS_INSTANCE, CLAIM_API, CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

export function getClaims(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM.GET_CLAIMS_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.post(
        `${CLAIM_API}/GetClaims`,
        queryParams,
        CONFIG
      );
    } else {
      apiPromise = AXIOS_INSTANCE.post(`${CLAIM_API}/GetClaims`, CONFIG);
    }
    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM.GET_CLAIMS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM.GET_CLAIMS_FAILURE, {
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

export function createClaim(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM.CREATE_CLAIM_REQUEST));
    // formData.grant_type = "Bearer";
    AXIOS_INSTANCE.post(`${CLAIM_API}/CreateClaimByAgent`, formData, CONFIG)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          AXIOS_INSTANCE.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${result.data.token}`;
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
        checkHttpStatus(error.response);
      });
  };
}

// Get claims by code
export function getClaimsbyCode(code) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "fr-FR",
      Authorization: JSON.parse(localStorage.getItem("foGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM.GET_CLAIMS_BY_CODE_REQUEST));
    AXIOS_INSTANCE.get(`${CLAIM_API}/${code}`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM.GET_CLAIMS_BY_CODE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM.GET_CLAIMS_BY_CODE_FAILURE, {
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

// Approve
export function approveClaim(data) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM.APPROVE_CLAIM_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/ApprovedClaim`, data, CONFIG)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM.APPROVE_CLAIM_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM.APPROVE_CLAIM_FAILURE, {
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

//getClaimChannel
export function getClaimChannel(data) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM.GET_CLAIM_CHANNEL_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/GetClaimChannels`, CONFIG)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM.GET_CLAIM_CHANNEL_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM.GET_CLAIM_CHANNEL_FAILURE, {
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

// UpdateClaimByAgent action
export function updateClaimByAgent(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM.UPDATE_CLAIM_BY_AGENT_REQUEST));
    AXIOS_INSTANCE.post(`${CLAIM_API}/UpdateClaimByAgent`, formData, CONFIG)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM.UPDATE_CLAIM_BY_AGENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM.UPDATE_CLAIM_BY_AGENT_FAILURE, {
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
// Update ticket attachment
export function updateTicketAttachment(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM.UPDATE_TICKET_ATTACHMENT_REQUEST));
    AXIOS_INSTANCE.patch(`${CLAIM_API}/UpdateTicketAttachment`, formData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM.UPDATE_TICKET_ATTACHMENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM.UPDATE_TICKET_ATTACHMENT_FAILURE, {
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

// Update ticket attachment based on calim ID
export function updateClaimAttachment(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM.UPDATE_CLAIM_ATTACHMENT_REQUEST));
    AXIOS_INSTANCE.patch(`${CLAIM_API}/UpdateClaimAttachment`, formData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM.UPDATE_CLAIM_ATTACHMENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM.UPDATE_CLAIM_ATTACHMENT_FAILURE, {
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

export function getTicketAttachment(code) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM.GET_TICKET_ATTACHMENT_REQUEST));
    AXIOS_INSTANCE.get(`${CLAIM_API}/GetTicketAttachment?code=${code}`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM.GET_TICKET_ATTACHMENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM.GET_TICKET_ATTACHMENT_FAILURE, {
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
// Get claim attachment based on calim ID
export function getClaimAttachment(code) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("foGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(base.getRequest(CLAIM.GET_CLAIM_ATTACHMENT_REQUEST));
    AXIOS_INSTANCE.get(`${CLAIM_API}/GetClaimAttachment?code=${code}`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CLAIM.GET_CLAIM_ATTACHMENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CLAIM.GET_CLAIM_ATTACHMENT_FAILURE, {
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
