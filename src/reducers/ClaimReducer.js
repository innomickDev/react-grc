import { CLAIM } from "../actions/actionTypes";
export default function reducer(state = {
  postClaimData: null,
  isCreateClaimError: null
}, action) {
  switch (action.type) {
    case CLAIM.GET_CLAIMS_REQUEST:
      return {
        ...state,
        getClaimsData: null,
        noClaimError: null,
      };
    case CLAIM.GET_CLAIMS_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        getClaimsData: action.payload ? action.payload.response.data.data : [],
        noClaimError: null,
      };
    case CLAIM.GET_CLAIMS_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        getClaimsData: null,
        noClaimError: action.payload.response
          ? action.payload.response.data.error.errorDescription
          : "",
      };
    //    Create new claim reducer
    case CLAIM.CREATE_CLAIM_REQUEST:
      return {
        ...state,
        postClaimData: null,
        successClaimCode: null,
        isCreateClaimError: null,
      };
    case CLAIM.CREATE_CLAIM_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        successClaimCode: action.payload.response
          ? action.payload.response.data.data.code
          : "",
        postClaimData: action.payload.response.data.isSuccess ? true : false,
        isCreateClaimError: null,
      };
    case CLAIM.CREATE_CLAIM_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        successClaimCode: null,
        postClaimData: null,
        isCreateClaimError: action.payload.response
          ? action.payload.response.data.error.errorDescription
          : "",
      };

    //    Get claim by code
    case CLAIM.GET_CLAIMS_BY_CODE_REQUEST:
      return {
        ...state,
        getClaimsbyCodeData: null,
      };
    case CLAIM.GET_CLAIMS_BY_CODE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        getClaimsbyCodeData: action.payload
          ? action.payload.response.data.data
          : [],
      };
    case CLAIM.GET_CLAIMS_BY_CODE_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        getClaimsbyCodeData: null,
      };

    //    Approve claim
    case CLAIM.APPROVE_CLAIM_REQUEST:
      return {
        ...state,
        isApprovedSuccess: null,
      };
    case CLAIM.APPROVE_CLAIM_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isApprovedSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
      };
    case CLAIM.APPROVE_CLAIM_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        isApprovedSuccess: null,
      };
    //    getClaimChannel
    case CLAIM.GET_CLAIM_CHANNEL_REQUEST:
      return {
        ...state,
        channelData: null,
      };
    case CLAIM.GET_CLAIM_CHANNEL_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        channelData: action.payload.response
          ? action.payload.response.data.data
          : [],
      };
    case CLAIM.GET_CLAIM_CHANNEL_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        channelData: null,
      };

    case CLAIM.UPDATE_CLAIM_BY_AGENT_REQUEST:
      return {
        ...state,
        isUpdateSuccess: null,
        isUpdateError: null,
      };
    case CLAIM.UPDATE_CLAIM_BY_AGENT_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isUpdateSuccess: action.payload.response.data.isSuccess ? true : false,
        isUpdateError: null,
      };
    case CLAIM.UPDATE_CLAIM_BY_AGENT_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        isUpdateSuccess: null,
        isUpdateError: action.payload.response
          ? action.payload.response.data.error.errorDescription
          : "",
      };
    case CLAIM.UPDATE_TICKET_ATTACHMENT_REQUEST:
      return {
        ...state,
        isUpdateTicketAttachment: null,
        isUpdateTicketAttachmentError: false,
      };
    case CLAIM.UPDATE_TICKET_ATTACHMENT_SUCCESS:
      return {
        ...state,
        isUpdateTicketAttachment: action.payload.response
          ? action.payload.response.data.data
          : null,
        isUpdateTicketAttachmentError: false,
      };
    case CLAIM.UPDATE_TICKET_ATTACHMENT_FAILURE:
      return {
        ...state,
        isUpdateTicketAttachment: null,
        isUpdateTicketAttachmentError: action.payload.response
          ? action.payload.response.data.error.errorDescription
          : false,
      };

    case CLAIM.UPDATE_CLAIM_ATTACHMENT_REQUEST:
      return {
        ...state,
        isUpdateClaimAttachment: null,
        isUpdateClaimAttachmentError: false,
      };
    case CLAIM.UPDATE_CLAIM_ATTACHMENT_SUCCESS:
      return {
        ...state,
        isUpdateClaimAttachment: action.payload.response
          ? action.payload.response.data.data
          : null,
        isUpdateClaimAttachmentError: false,
      };
    case CLAIM.UPDATE_CLAIM_ATTACHMENT_FAILURE:
      return {
        ...state,
        isUpdateClaimAttachment: null,
        isUpdateClaimAttachmentError: action.payload.response
          ? action.payload.response.data.error.errorDescription
          : false,
      };

    //get ticket attachment
    case CLAIM.GET_TICKET_ATTACHMENT_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        getTicketAttachmentData: null,
        getTicketAttachmentErrorStatus: false,
      };
    case CLAIM.GET_TICKET_ATTACHMENT_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        getTicketAttachmentData: action.payload.response
          ? action.payload.response.data.data
          : null,
        getTicketAttachmentErrorStatus: false,
      };
    case CLAIM.GET_TICKET_ATTACHMENT_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        getTicketAttachmentData: null,
        getTicketAttachmentErrorStatus: action.payload.response
          ? action.payload.response.data.error.errorDescription
          : "",
      };

    //get claim attachment
    case CLAIM.GET_CLAIM_ATTACHMENT_REQUEST:
      return {
        ...state,
        getClaimAttachment: null,
        ClaimAttachmentData: null,
        isRequest: true,
      };
    case CLAIM.GET_CLAIM_ATTACHMENT_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        getClaimAttachment: action.payload.response.data.isSuccess
          ? true
          : false,
        ClaimAttachmentData: action.payload.response.data.data,
        isRequest: false,
      };
    case CLAIM.GET_CLAIM_ATTACHMENT_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        getClaimAttachment: null,
        ClaimAttachmentData: null,
        isRequest: false,
      };
  }
  return state;
}
