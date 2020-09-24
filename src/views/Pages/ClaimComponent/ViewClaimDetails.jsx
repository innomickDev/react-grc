import React, { Fragment } from "react";
import {
  Card,
  CardBody,
  Row,
  Form,
  Container,
  Col,
  FormGroup,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import { Field, reduxForm } from "redux-form";
import bgImage from "../../../assets/img/plain-white.jpg";
import {
  getClaimsbyCode,
  approveClaim,
  getClaimAttachment,
  getTicketAttachment,
} from "../../../actions/claimAction";

import {
  dateTimeFormat,
  getLangBasedDataLabel,
  getLangBasedStationLabel,
  getLangBasedTarifLabel,
  showSuccess,
  getFileExtension,
  showError,
} from "../../../helpers";
import SubmitBtnLoader from "../CommonComponents/SubmitBtnLoader";
import qString from "query-string";
import { renderTextField } from "./RenderTextField";
import LoaderComponent from "../CommonComponents/Loader";

class ViewClaimDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showInput: false,
      hideBtn: true,
      mainLoader: true,
    };
  }

  componentDidMount = () => {
    const params = qString.parse(this.props.location.search);
    this.props.dispatch(getClaimsbyCode(params.code));
  };
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.getClaimsbyCodeData &&
      nextProps.getClaimsbyCodeData !== this.props.getClaimsbyCodeData
    ) {
      this.setState({
        claimData: nextProps.getClaimsbyCodeData,
        mainLoader: false,
      });
    }
    if (
      nextProps.isApprovedSuccess &&
      nextProps.isApprovedSuccess !== this.props.isApprovedSuccess
    ) {
      this.setState({ loading: false, showInput: false });
      const params = qString.parse(this.props.location.search);
      this.props.dispatch(getClaimsbyCode(params.code));
      showSuccess(this.props.t("SuccessMsg.CLAIM_APPROVED"));
    }
    if (
      nextProps.getTicketAttachmentData &&
      nextProps.getTicketAttachmentData !== this.props.getTicketAttachmentData
    ) {
      this.setState({
        getTicketAttachment: nextProps.getTicketAttachmentData.attachment
          ? getFileExtension(
            nextProps.getTicketAttachmentData.attachment.slice(0, 5)
          ) + nextProps.getTicketAttachmentData.attachment
          : "",
        mainLoader: false,
      });
      setTimeout(
        function () {
          document.getElementById("ticket") &&
            document.getElementById("ticket").click();
          this.setState({
            getTicketAttachment: null,
          });
        }.bind(this),
        1000
      );
    }
    if (
      nextProps.ClaimAttachmentData &&
      nextProps.ClaimAttachmentData !== this.props.ClaimAttachmentData
    ) {
      if (
        nextProps.ClaimAttachmentData.attachment &&
        nextProps.ClaimAttachmentData.attachment !== ""
      ) {
        this.setState({
          ClaimAttachmentData:
            nextProps.ClaimAttachmentData.attachment
              ? getFileExtension(
                nextProps.ClaimAttachmentData.attachment.slice(0, 5)
              ) + nextProps.ClaimAttachmentData.attachment
              : false,
        });
        setTimeout(
          function () {
            document.getElementById("claimId") &&
              document.getElementById("claimId").click();
            this.setState({
              ClaimAttachmentData: null,
            });
          }.bind(this),
          1000
        );
      } else {
        showError(this.props.t("ErrorMsg.NO_CLAIM_ATTACHMENT"));
      }
    }
  };

  onSubmit = (formProps) => {
    const params = qString.parse(this.props.location.search);
    const requestData = {
      claimCode: parseInt(params.code),
      actionTaken: formProps.actionTaken,
    };
    if (formProps.actionTaken) {
      this.props.dispatch(approveClaim(requestData));
      this.setState({ loading: true });
    }
  };
  showInputField = () => {
    this.setState({ showInput: !this.state.showInput, hideBtn: false });
  };
  showClaimCommunication = (communicationData) => {
    return communicationData.map((data, key) => {
      return (
        <Col md={12} className="mt-2">
          <Card className="mb-1 p-2">
            <span>
              <strong>{this.props.t("Claim.DATE")}</strong>:
              {data ? dateTimeFormat(data.date) : ""}
            </span>
            <br />
            <span>
              <strong>{this.props.t("Claim.SENT_MESSAGE")}</strong>:
                {/* {data ? data.sentMessage : ""} */}
              <div
                dangerouslySetInnerHTML={{
                  __html: data ? data.sentMessage : "",
                }}
              />
            </span>
          </Card>
        </Col>
      );
    });
  };

  render() {
    const claimData = this.state.claimData;
    console.log('datttttt-----', claimData);
    const { handleSubmit } = this.props;

    return (
      <Fragment>
        <LoaderComponent loading={this.state.mainLoader} />
        <div className="full-page-content">
          <div className="login-page">
            <Container>
              <div className="card-header-c">
                <span>{this.props.t("Claim.VIEW_CLAIM_DETAILS")}</span>
              </div>
              <Card className="p-3" id="ic-card">
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <ul className="list-group">
                        <li class="list-group-item">
                          {this.props.t("Claim.CLAIM_ID")} :{" "}
                          <b>{claimData ? claimData.claimCode : ""}</b>
                        </li>
                        <li className="list-group-item">
                          {this.props.t("Claim.CLAIM_CHANNEL")} :{" "}
                          <b>
                            {claimData && claimData
                              ? getLangBasedDataLabel(claimData.claimSource)
                              : "none"}
                          </b>
                        </li>
                        <li class="list-group-item">
                          {this.props.t("Claim.REF_N")} :{" "}
                          <b>{claimData ? claimData.referenceNo : ""}</b>
                        </li>

                        <li className="list-group-item">
                          {this.props.t("Claim.CREATION_DATE")} :{" "}
                          <b>
                            {claimData && claimData
                              ? dateTimeFormat(claimData.createDate)
                              : ""}
                          </b>
                        </li>
                        <li class="list-group-item">
                          {this.props.t("Claim.CLAIM_SUBJECT_X")} :{" "}
                          <b>{claimData ? claimData.claimSubject : ""}</b>
                        </li>
                        <li class="list-group-item">
                          {this.props.t("Claim.CLAIM_SUBJECT")} :{" "}
                          <b>{claimData ? claimData.claimDetails : ""}</b>
                        </li>
                        <li class="list-group-item">
                          {" "}
                          {this.props.t("Claim.CATEGORY")} :{" "}
                          <b>
                            {claimData && claimData
                              ? getLangBasedDataLabel(claimData.category)
                              : "none"}
                          </b>
                        </li>
                        <li className="list-group-item">
                          {this.props.t("Claim.SUB_CATEGORY")} :{" "}
                          <b>
                            {claimData && claimData
                              ? getLangBasedDataLabel(claimData.subCategory)
                              : "none"}
                          </b>
                        </li>

                        <li className="list-group-item">
                          {this.props.t("Claim.EVENT_DATE")} :{" "}
                          <b>
                            {claimData && claimData
                              ? dateTimeFormat(claimData.eventDate)
                              : ""}
                          </b>
                        </li>
                        <li class="list-group-item">
                          {this.props.t("Claim.EVENT_LOCATION")} :{" "}
                          <b>{claimData ? claimData.eventLocation : ""}</b>
                        </li>

                        {claimData && claimData.claimStatus === "1" && (
                          <li class="list-group-item">
                            {this.props.t("Claim.CLAIM_STATUS")} :{" "}
                            <b>{this.props.t("Claim.SUBMITTED")}</b>
                          </li>
                        )}
                        {claimData && claimData.claimStatus === "2" && (
                          <li class="list-group-item">
                            {this.props.t("Claim.CLAIM_STATUS")} :{" "}
                            <b> {this.props.t("Claim.IN_PROGRESS")}</b>
                          </li>
                        )}
                        {claimData && claimData.claimStatus === "3" && (
                          <li class="list-group-item">
                            {this.props.t("Claim.CLAIM_STATUS")} :{" "}
                            <b>{this.props.t("Claim.APPROVED")}</b>
                          </li>
                        )}
                        {claimData && claimData.claimStatus === "4" && (
                          <li class="list-group-item">
                            {this.props.t("Claim.CLAIM_STATUS")} :{" "}
                            <b>{this.props.t("Claim.REJECTED")}</b>
                          </li>
                        )}
                        {claimData && claimData.claimStatus === "5" && (
                          <li class="list-group-item">
                            {this.props.t("Claim.CLAIM_STATUS")} :{" "}
                            <b>{this.props.t("Claim.TEMP_APPROVED")}</b>
                          </li>
                        )}
                      </ul>
                    </Col>
                    <Col md={6}>
                      <ul className="list-group">
                        <li className="list-group-item">
                          {this.props.t("Claim.CLAIM_SRC")} :{" "}
                          <b>
                            {claimData && claimData
                              ? getLangBasedStationLabel(claimData.claimStation)
                              : "none"}
                          </b>
                        </li>
                        {claimData && claimData.eventLocation === "Gare" && (
                          <li className="list-group-item">
                            {this.props.t("Claim.EVENT_STATION")} :{" "}
                            <b>
                              {claimData && claimData
                                ? getLangBasedStationLabel(
                                  claimData.eventStation
                                )
                                : "none"}
                            </b>
                          </li>
                        )}

                        {/* For train */}
                        {claimData && claimData.eventLocation === "Train" && (
                          <li className="list-group-item">
                            {this.props.t("Claim.DEPARTURE_TIME")} :{" "}
                            <b>{claimData ? claimData.departureHour : ""}</b>
                          </li>
                        )}
                        {claimData && claimData.eventLocation === "Train" && (
                          <li className="list-group-item">
                            {this.props.t("Claim.ARRIVING_TIME")} :{" "}
                            <b>{claimData ? claimData.arrivalHour : ""}</b>
                          </li>
                        )}

                        {claimData && claimData.eventLocation === "Train" && (
                          <li className="list-group-item">
                            {this.props.t("Claim.DEPART_STN")} :{" "}
                            <b>
                              {claimData && claimData
                                ? getLangBasedStationLabel(
                                  claimData.departureStation
                                )
                                : "none"}
                            </b>
                          </li>
                        )}

                        {claimData && claimData.eventLocation === "Train" && (
                          <li className="list-group-item">
                            {this.props.t("Claim.ARRIV_STN")} :{" "}
                            <b>
                              {claimData && claimData
                                ? getLangBasedStationLabel(
                                  claimData.arrivalStation
                                )
                                : "none"}
                            </b>
                          </li>
                        )}

                        {claimData && claimData.eventLocation === "Train" && (
                          <li className="list-group-item">
                            {this.props.t("Claim.TRAIN_NUMBER")} :{" "}
                            <b>{claimData ? claimData.trainNumber : ""}</b>
                          </li>
                        )}
                        {claimData && claimData.eventLocation === "Train" && (
                          <li className="list-group-item">
                            {this.props.t("Claim.TYPE_OF_TRAIN")} :{" "}
                            <b>
                              {claimData && claimData.trainType
                                ? claimData.trainType.designation
                                : "Aucune"}
                            </b>
                          </li>
                        )}
                        <li className="list-group-item">
                          {this.props.t("Claim.TRAVEL_DATE_TIME")} :{" "}
                          <b>
                            {claimData && claimData
                              ? dateTimeFormat(claimData.travelDate)
                              : ""}
                          </b>
                        </li>
                        {claimData && claimData.eventLocation === "Train" && (
                          <li className="list-group-item">
                            {this.props.t("Claim.TARIF")} :{" "}
                            <b>
                              {claimData && claimData
                                ? getLangBasedTarifLabel(claimData.tarif)
                                : "none"}
                            </b>
                          </li>
                        )}
                        {claimData && claimData.eventLocation === "Train" && (
                          <li className="list-group-item">
                            {this.props.t("Claim.UPDATE_DATE")} :{" "}
                            <b>
                              {claimData && claimData
                                ? dateTimeFormat(claimData.lastModifiedDate)
                                : ""}
                            </b>
                          </li>
                        )}
                        <li className="list-group-item">
                          {this.props.t("Claim.ACTION_TAKEN")} :{" "}
                          <b>{claimData && claimData.actionTaken ? claimData.actionTaken : "Aucune"}</b>
                        </li>
                        <li className="list-group-item">
                          <a
                            href="javscript:void(0)"
                            onClick={() =>
                              this.props.dispatch(
                                getTicketAttachment(claimData.code)
                              )
                            }
                          >
                            <i class="fas fa-file-download text-success"></i>
                            {"  "}
                            <b class="text-dark">
                              {this.props.t("Claim.DOWNLOAD_ATTACHMENT")}
                            </b>
                          </a>
                          <br />
                          <a
                            id="ticket"
                            href={
                              this.state.getTicketAttachment
                                ? this.state.getTicketAttachment
                                : "#"
                            }
                            target={"_blank"}
                            download={"Ticket_Attachment"}
                          ></a>
                        </li>
                        {/* )} */}
                        {/* {this.state.ClaimAttachmentData && ( */}
                        <li className="list-group-item">
                          <a
                            href="javscript:void(0)"
                            onClick={() =>
                              this.props.dispatch(
                                getClaimAttachment(claimData.code)
                              )
                            }
                          >
                            <i class="fas fa-file-download text-success"></i>{" "}
                            <b class="text-dark">
                              {this.props.t("Claim.DOWNLOAD_CLAIM_ATTACHMENT")}
                            </b>
                          </a>
                          <br />
                          <a
                            id="claimId"
                            href={
                              this.state.ClaimAttachmentData
                                ? this.state.ClaimAttachmentData
                                : "#"
                            }
                            target={"_blank"}
                            download={"Claim_Attachment"}
                          ></a>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                  <br />
                  {claimData && claimData.claimStatus === "1" && (
                    <Row>
                      <Col md={12} lg={12}>
                        <h5>{this.props.t("Claim.PROCESS_CLAIM")}</h5>
                        {this.state.hideBtn && (
                          <Button
                            className="btn btn-success"
                            onClick={() => this.showInputField()}
                          // disabled={this.state.disabled}
                          >
                            {this.props.t("Claim.APPROVE")}
                          </Button>
                        )}

                        {this.state.showInput && (
                          <Form
                            noValidate
                            className="form-horizontal"
                            onSubmit={handleSubmit(this.onSubmit)}
                          >
                            <FormGroup>
                              {/* <Label for="exampleEmail">Action Taken</Label> */}
                              <Field
                                name="actionTaken"
                                type="textarea"
                                component={renderTextField}
                                placeholder={this.props.t("Claim.ACTION_TAKEN")}
                                required
                              />
                            </FormGroup>
                            <SubmitBtnLoader
                              type="submit"
                              className="btn btn-success"
                              label={this.props.t("Claim.SUBMIT_ACTION")}
                              loading={this.state.loading}
                              submitting={""}
                            />
                          </Form>
                        )}
                      </Col>
                    </Row>
                  )}
                  {claimData && claimData.claimStatus === "3" && <Row>
                    {" "}
                    {claimData && (
                      <Col md={12} className="mt-2">
                        <Card className="mb-1 p-2">
                          <strong>
                            {this.props.t("Claim.CLAIM_COMMUNICATION")}
                          </strong>
                        </Card>
                      </Col>
                    )}
                    {claimData &&
                      this.showClaimCommunication(
                        claimData.claimCommunication
                      )}
                  </Row>}
                </CardBody>
              </Card>
            </Container>
          </div>
        </div>
        <div
          className="full-page-background"
          style={{ backgroundImage: "url(" + bgImage + ")" }}
        />
      </Fragment>
    );
  }
}

ViewClaimDetails = reduxForm({
  form: "ViewClaimDetails",
})(ViewClaimDetails);

const mapStateToProps = (state) => {
  return {
    getClaimsbyCodeData: state.claim.getClaimsbyCodeData,
    isApprovedSuccess: state.claim.isApprovedSuccess,
    getTicketAttachmentData: state.claim.getTicketAttachmentData,
    ClaimAttachmentData: state.claim.ClaimAttachmentData,
  };
};

export default compose(translate, connect(mapStateToProps))(ViewClaimDetails);

