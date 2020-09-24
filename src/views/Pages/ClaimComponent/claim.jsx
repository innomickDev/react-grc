import React, { Fragment } from "react";
import { Card, CardBody, Row, Col, Input, Label, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import { Field, reduxForm } from "redux-form";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {
  renderSelectField,
  renderTextField,
} from "../CommonComponents/RenderTextField";
import Datetime from "react-datetime";
import moment from "moment";
import { createClaim } from "../../../actions/claimAction";
import {
  getLangBasedItems,
  getLangBasedStations,
  getBase64,
  showError,
  showSuccess,
} from "../../../helpers";
import { getSubCategoriesByCategory } from "../../../actions/subCategoryAction";
import _ from "lodash";
import SubmitBtnLoader from "../CommonComponents/SubmitBtnLoader";
import { getTrainType } from "../../../actions/trainTypeAction";
import { getTarif } from "../../../actions/tarifAction";
import "moment/locale/fr"; // without this line it won't work
moment.locale("fr");
export class CreateInitialClaim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFields: false,
      loading: false,
      depStation: '',
      arrStation: ''
    };
  }
  componentWillReceiveProps = (nextProps, props) => {

    if (
      nextProps.postClaimData &&
      nextProps.postClaimData !== this.props.postClaimData
    ) {
      // this.props.history.push("/pages/research-claim");
      this.setState({ loading: false });
      showSuccess(this.props.t("Claim.CLAIM_CREATED_SUCCESSFULLY"));

    }
    // if (
    //   nextProps.isCreateClaimError &&
    //   nextProps.isCreateClaimError !== this.props.isCreateClaimError
    // ) {
    //   showError(nextProps.isCreateClaimError);
    //   this.setState({ loading: false });
    // }
    if (nextProps !== props) {
      if (nextProps.errorData && nextProps.errorData !== this.props.errorData) {
        showError(nextProps.errorData);
        this.setState({ loading: false });
      }
    }

  };
  showOptions = (data) => {
    if (data && data.length) {
      return data.map((categories, key) => {
        return (
          <option value={categories.value} key={key}>
            {categories.label}
          </option>
        );
      });
    }
  };
  /*-----------function for show train types ------------ */
  showTrainTypes = (data) => {
    if (data && data.length) {
      return data.map((type, key) => {
        return (
          //todo need to discuss this point
          <option value={type.codeClassification} key={key}>
            {type.designation}
            {/* {type.codeClassification} */}
          </option>
        );
      });
    }
  };

  // get sub category by categoryID
  getSubCategoriesByCategory = (e) => {
    if (e.target.value !== "0") {
      const category = _.find(this.props.categoryData.categoryClients, {
        code: e.target.value,
      });
      this.props.dispatch(getSubCategoriesByCategory(e.target.value));
    } else {
      this.setState({
        getSubCategoriesByCategory: [],
      });
    }
  };
  handleFileInput = (e, type) => {
    this.refs[type].click(e);
  };
  // this is the function triggered for the file type input
  // it will store inside the components state the names of the files and the files
  // after that, if you want to save the files you need to add a special on submit function for that
  // we haven't since we do not need to save the files - everything in our product is only front-end
  addFile = (e, type) => {
    let fileNames = "";
    let files = e.target.files;
    for (let i = 0; i < e.target.files.length; i++) {
      fileNames = fileNames + e.target.files[i].name;
      if (type === "multipleFile" && i !== e.target.files.length - 1) {
        fileNames = fileNames + ", ";
      }
    }
    this.setState({
      [type + "Name"]: fileNames,
      [type]: files,
    });
  };

  /**call this function to select file (upload file) */
  uploadFile = (e, value) => {
    const fileSize = e.target.files[0] ? e.target.files[0].size : 0;
    if (fileSize > 0 && fileSize <= 1000000) {
      this.currentFile = e.target.files[0].name;
      const extensions = ["jpg", "jpeg", "bmp", "gif", "png", "pdf"];
      const fileExtension = e.target.files[0].name.split(".").pop();
      if (
        fileSize > 0 &&
        fileSize <= 1000000 &&
        extensions.includes(fileExtension.toLowerCase())
      ) {
        getBase64(e.target.files[0], (result) => {
          this.setState({ ticketAttachment: result });
        });
      }
    } else {
      showError(this.props.t("ErrorMsg.FILE_ERROR"));
      e.target.value = null;
      this.setState({ loading: false });
    }
  };
  // Update claim
  uploadClaimFile = (e, value) => {
    const fileSize = e.target.files[0] ? e.target.files[0].size : 0;
    if (fileSize > 0 && fileSize <= 1000000) {
      this.currentClaimFile = e.target.files[0].name;
      const extensions = ["jpg", "jpeg", "bmp", "gif", "png", "pdf"];
      const fileExtension = e.target.files[0].name.split(".").pop();
      if (
        fileSize > 0 &&
        fileSize <= 1000000 &&
        extensions.includes(fileExtension.toLowerCase())
      ) {
        getBase64(e.target.files[0], (result) => {
          this.setState({ claimAttachment: result });
        });
      }
    } else {
      showError(this.props.t("ErrorMsg.FILE_ERROR"));
      e.target.value = null;
      this.setState({ loading: false });
    }
  };
  startDate = (event) => {
    this.setState({
      startDate: event.format("YYYY-MM-DD"),
      startDateSelectedValue: event,
    });
  };
  endDate = (event) => {
    this.setState({
      endDate: event.format("YYYY-MM-DD"),
      selectedValue: event,
    });
  };
  minDate = (current) => {
    if (this.state.startDate) {
      const date = moment(this.state.startDate).subtract(1, "day");
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 1);
      return current.isAfter(date);
    } else {
      const yesterday = moment(new Date()).subtract(1, "day");
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 1);
      return current.isAfter(yesterday);
    }
  };
  onSubmit = (formProps) => {
    console.log('=============', formProps);
    if (formProps.eventLocation !== "Train") {
      delete formProps.departureHour;
      delete formProps.departureStationCode;
      delete formProps.arrivalStationCode;
      delete formProps.arrivalHour;
      delete formProps.trainClassificationCode;
      delete formProps.trainNumber;
      delete formProps.tarifCode;
    }
    if (formProps.eventLocation == "Train" && formProps.arrivalStationCode === formProps.departureStationCode) {
      showError("La station doit être différente");
      return false;
    }

    if (formProps.eventLocation !== "Gare") {
      delete formProps.eventStationCode;
    }
    if (formProps) {
      formProps.claimChannel = "GRC";
    }
    if (this.props.userData) {
      formProps.userCode = this.props.userData.codeClient;
      formProps.userEmail = this.props.userData.login;
    }
    if (this.state.startDate) {
      formProps.eventDate = String(new Date(this.state.startDate).getTime());
    }
    if (this.state.endDate) {
      formProps.travelDate = String(new Date(this.state.endDate).getTime());
    }
    if (this.state.ticketAttachment) {
      formProps.ticketAttachment = this.state.ticketAttachment.split(",")[1];
    }
    if (this.state.claimAttachment) {
      formProps.claimAttachment = this.state.claimAttachment.split(",")[1];
    }
    if (formProps.claimCode && formProps.claimSubject && formProps.userEmail && formProps.claimSourceCode && formProps.subCategoryCode) {
      if (formProps.eventLocation) {
        if (this.state.startDate) {
          if(formProps.eventLocation === 'Gare'){
            if(formProps.eventStationCode) {
              this.props.dispatch(createClaim(formProps));
              this.setState({ loading: true });
            } else {
              showError(this.props.t("Claim.STATION_REQUIRED"));
            }
          } else {
            this.props.dispatch(createClaim(formProps));
            this.setState({ loading: true });
          }
        } else {
          showError(this.props.t("Claim.EVENT_LOCATION_DATE"));
        }
      } else {
        showError(this.props.t("Claim.EVENT_LOCATION_REQUIRED"));
      }
    } else {
    }
      // } else {
    //   showError(this.props.t("Claim.EVENT_LOCATION_REQUIRED"));
    // }
    //   showError(this.props.t("Claim.PLEASE_FILL_ALL_REQUIRED_FIELDS"));
  };
  showList = (e) => {
    if (e.target.value === "Train") {
      this.props.dispatch(getTrainType());
      this.props.dispatch(getTarif());
      this.setState({ showFields: true, showEventStation: false });
    } else if (e.target.value === "Gare") {
      this.setState({ showFields: false, showEventStation: true });
    } else {
      this.setState({
        showEventStation: false,
        showFields: false,
      });
    }
  };

  departureStation = (e) => {
    if (e.target.value != this.state.arrStation) {
      this.setState({
        depStation: e.target.value
      })
    } else {
      showError("La station doit être différente")
    }
  }
  arrivalStation = (e) => {
    console.log(e.target.value);
    if (e.target.value != this.state.depStation) {
      this.setState({
        arrStation: e.target.value
      })
    } else {
      e.target = null;
      showError("La station doit être différente")
    }
  }

  render() {
    // console.log(this.props.postClaimData);
    const { handleSubmit } = this.props;
    // console.log(this.props.trainTypeData, this.props.tarifData);
    return (
      <Fragment>
        <AvForm
          className="px-5"
          noValidate
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <div className="card-header-c">
            <span>{this.props.t("Claim.TO_CLOSE_IMMEDIATELY")}</span>
          </div>
          <Card className="p-3" id="ic-card">
            <CardBody>
              <Row>
                <Col md={4} lg={4}>
                  <Label for="exampleEmail">
                    {this.props.t("Claim.CLAIM_ID")}{" "}
                    <span className="text-danger">*</span>
                  </Label>
                  <FormGroup>
                    <AvField
                      name="claimCode"
                      type="text"
                      component={renderTextField}
                      placeholder={this.props.t("Claim.CLAIM_ID")}
                      tag={Field}
                      required
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t("ErrorMsg.REQUIRED_FIELD"),
                        },
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={4} lg={4}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      {this.props.t("Claim.CLAIM_CHANNEL")}{" "}
                      <span className="text-danger">*</span>
                    </Label>
                    <Field
                      name="claimSourceCode"
                      type="select"
                      placeholder={this.props.t("Claim.CLAIM_CHANNEL")}
                      id="exampleSelect"
                      component={renderTextField}
                    >
                      {/*// disabled={this.props.initialValues}*/}
                      <option value="">
                        {this.props.t("Claim.SELECT_CHANNEL")}
                      </option>
                      {this.showOptions(
                        this.props.channelData
                          ? getLangBasedItems(
                            this.props.channelData.channelClients
                          )
                          : null
                      )}
                    </Field>
                  </FormGroup>
                </Col>
                <Col md={4} lg={4}>
                  <FormGroup>
                    <Label for="exampleSelect">
                      {this.props.t("Claim.CLAIM_SRC")}{" "}
                      <span className="text-danger">*</span>
                    </Label>
                    <Field
                      component={"select"}
                      name="claimStationCode"
                      className="form-control"
                      id="exampleSelect"
                    >
                      <option value="">
                        {this.props.t("Claim.SELECT_CLAIM_SRC")}
                      </option>
                      {this.showOptions(
                        this.props.stationData
                          ? getLangBasedStations(
                            this.props.stationData.listGare
                          )
                          : null
                      )}
                    </Field>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4} lg={4}>
                  <FormGroup>
                    <Label for="exampleDatetime">
                      {this.props.t("Claim.DATE_OF_FILLING_COMPLAINT")}{" "}
                      <span className="text-danger">*</span>
                    </Label>
                    <Datetime
                      closeOnSelect
                      // onBlur={this.focousOut}
                      value={this.state.endDate}
                      timeFormat={false}
                      dateFormat
                      inputProps={{
                        readOnly: true,
                        placeholder: this.props.t("Claim.SELECT_DATE"),
                      }}
                      // isValidDate={this.minDate}
                      onChange={(e) => this.endDate(e)}
                    />
                  </FormGroup>
                </Col>{" "}
                <Col md={4} lg={4}>
                  <FormGroup>
                    <Label for="exampleSelect">
                      {this.props.t("Claim.CLAIM_CATEGORY")}{" "}
                      <span className="text-danger">*</span>
                    </Label>
                    <Field
                      component={renderSelectField}
                      name="categoryCode"
                      id="exampleSelect"
                      className="form-control"
                      onChange={(e) => this.getSubCategoriesByCategory(e)}
                    >
                      <option value="">
                        {this.props.t("Claim.SELECT_CATEGORY_CLAIM")}
                      </option>
                      {this.showOptions(
                        this.props.categoryData
                          ? getLangBasedItems(
                            this.props.categoryData.categoryClients
                          )
                          : null
                      )}
                    </Field>
                  </FormGroup>
                </Col>{" "}
                <Col md={4} lg={4}>
                  <FormGroup>
                    <Label for="exampleSelect">
                      {this.props.t("Claim.COMPLAINT_SUBCATEGORY")}{" "}
                      <span className="text-danger">*</span>
                    </Label>
                    <Field
                      component={renderSelectField}
                      type="select"
                      name="subCategoryCode"
                      id="exampleSelect"
                      className="form-control"
                    >
                      <option value="">
                        {this.props.t("Claim.SELECT_SUB_CATEGORY")}
                      </option>
                      {this.showOptions(
                        this.props.subCategoryDataByCategory
                          ? getLangBasedItems(
                            this.props.subCategoryDataByCategory
                              .subCategoryClients
                          )
                          : null
                      )}
                    </Field>
                  </FormGroup>
                </Col>{" "}
              </Row>
              <Row>
                <Col md={4} lg={4}>
                  <FormGroup>
                    <Label for="exampleDatetime">
                      {this.props.t("Claim.EVENT_DATE")}{" "}
                      <span className="text-danger">*</span>
                    </Label>
                    {/* <AvField
                        name='eventDate'
                        type='date'
                        component={renderTextField}
                        placeholder="Date de l'evenement"
                        tag={Field}
                        required
                      /> */}
                    <Datetime
                      closeOnSelect
                      // onBlur={this.focousOut}
                      value={this.state.startDate}
                      timeFormat={false}
                      dateFormat
                      inputProps={{
                        readOnly: true,
                        placeholder: this.props.t("Claim.SELECT_DATE"),
                      }}
                      // isValidDate={this.minDate}
                      onChange={(e) => this.startDate(e)}
                    />
                  </FormGroup>
                </Col>{" "}
                <Col md={4} lg={4}>
                  <FormGroup>
                    <Label for="exampleSelect">
                      {this.props.t("Claim.LOCATION_OF_EVENT")}{" "}
                      <span className="text-danger">*</span>
                    </Label>
                    <Field
                      type="select"
                      component={"select"}
                      className="form-control"
                      name="eventLocation"
                      id="exampleSelect"
                      required
                      // validate={{
                      //   required: {
                      //     value: true,
                      //     errorMessage: this.props.t("ErrorMsg.REQUIRED_FIELD"),
                      //   },
                      // }}
                      onChange={(e) => this.showList(e)}
                    >
                      <option value="">
                        {this.props.t("Claim.SELECT_EVENT")}
                      </option>
                      <option value="Gare">
                        {this.props.t("Claim.STATION")}
                      </option>
                      <option value="Train">
                        {this.props.t("Claim.TRAIN")}
                      </option>
                      <option value="Autre">
                        {this.props.t("Claim.OTHER")}
                      </option>
                    </Field>
                  </FormGroup>
                </Col>{" "}
                <Col md={4} lg={4}>
                  {this.state.showEventStation ? (
                    <FormGroup>
                      <Label for="exampleSelect">
                        {this.props.t("Claim.EVENT_STATION")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Field
                        component={"select"}
                        name="eventStationCode"
                        className="form-control"
                        id="exampleSelect"
                      >
                        <option value="">
                          {this.props.t("Claim.SELECT_STATION")}
                        </option>
                        {this.showOptions(
                          this.props.stationData
                            ? getLangBasedStations(
                              this.props.stationData.listGare
                            )
                            : null
                        )}
                      </Field>
                    </FormGroup>
                  ) : (
                      ""
                    )}
                </Col>
              </Row>
              {this.state.showFields ? (
                <Row>
                  <Col md={4} lg={4}>
                    <Label for="exampleEmail">
                      {this.props.t("Claim.DEPARTURE_TIME")}
                    </Label>
                    <FormGroup>
                      <Field
                        name="departureHour"
                        type="time"
                        component={renderTextField}
                        placeholder={this.props.t("Claim.DEPARTURE_TIME")}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} lg={4}>
                    <Label className="c-lable " for="exampleEmail">
                      {this.props.t("Claim.DEPARTURE_STATION")}{" "}
                      <span className="text-danger">*</span>
                    </Label>
                    <FormGroup>
                      <Field
                        name="departureStationCode"
                        component={"select"}
                        required
                        // validate={[required]}
                        className="form-control"
                        onChange={(e) => this.departureStation(e)}

                      >
                        <option value="">
                          {this.props.t("Claim.SELECT_STATION")}
                        </option>
                        {this.showOptions(
                          this.props.stationData
                            ? getLangBasedStations(
                              this.props.stationData.listGare
                            )
                            : null
                        )}
                      </Field>
                    </FormGroup>
                  </Col>
                  <Col md={4} lg={4}>
                    <Label className="c-lable " for="exampleEmail">
                      {this.props.t("Claim.ARRIVAL_STATION")}{" "}
                      <span className="text-danger">*</span>
                    </Label>
                    <FormGroup>
                      <Field
                        name="arrivalStationCode"
                        component={"select"}
                        required
                        // validate={[required]}
                        className="form-control"
                        onChange={(e) => this.arrivalStation(e)}
                      >
                        <option value="">
                          {this.props.t("Claim.SELECT_STATION")}
                        </option>
                        {this.showOptions(
                          this.props.stationData
                            ? getLangBasedStations(
                              this.props.stationData.listGare
                            )
                            : null
                        )}
                      </Field>
                    </FormGroup>
                  </Col>
                </Row>
              ) : (
                  ""
                )}
              {this.state.showFields ? (
                <Row>
                  <Col md={4} lg={4}>
                    <Label className="c-lable " for="exampleEmail">
                      {this.props.t("Claim.ARRIVING_TIME")}
                    </Label>
                    <FormGroup>
                      <Field
                        name="arrivalHour"
                        type="time"
                        component={renderTextField}
                        placeholder={this.props.t("Claim.ARRIVING_TIME")}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} lg={4}>
                    <Label className="c-lable " for="exampleEmail">
                      {this.props.t("Claim.TYPE_OF_TRAIN")}
                    </Label>
                    <FormGroup>
                      <Field
                        name="trainClassificationCode"
                        type="select"
                        component={"select"}
                        placeholder={this.props.t("Claim.TYPE_OF_TRAIN")}
                        className="form-control"
                      >
                        <option value="">
                          {this.props.t("Claim.SELECT_TRAIN_TYPE")}
                        </option>
                        {this.showTrainTypes(this.props.trainTypeData)}
                      </Field>
                    </FormGroup>
                  </Col>
                  <Col md={4} lg={4}>
                    <Label className="c-lable " for="exampleEmail">
                      {this.props.t("Claim.TRAIN_NUMBER")}
                    </Label>
                    <FormGroup>
                      <AvField
                        name="trainNumber"
                        type="text"
                        tag={Field}
                        component={renderTextField}
                        placeholder={this.props.t("Claim.TRAIN_NUMBER")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              ) : (
                  ""
                )}
              {this.state.showFields ? (
                <Row>
                  <Col md={4} lg={4}>
                    <Label className="c-lable " for="exampleEmail">
                      {this.props.t("Claim.RATE")}{" "}
                      <span className="text-danger">*</span>
                    </Label>
                    <FormGroup>
                      <Field
                        name="tarifCode"
                        type="select"
                        component={"select"}
                        placeholder={this.props.t("Claim.RATE")}
                        className="form-control"
                        required
                      >
                        <option value="">
                          {this.props.t("Claim.SELECT_RATE")}
                        </option>
                        {this.showOptions(
                          this.props.tarifData
                            ? getLangBasedItems(this.props.tarifData.listTarif)
                            : null
                        )}
                      </Field>
                    </FormGroup>
                  </Col>
                </Row>
              ) : (
                  ""
                )}
              <br />
              <Row className="rm-z-index">
                <Col md={7}>
                  <div className="rm-b">
                    <br />
                    <FormGroup>
                      <Label for="exampleEmail">
                        {this.props.t("Claim.CLAIM_OBJECT")}
                        {" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <AvField
                        name="claimSubject"
                        type="textarea"
                        tag={Field}
                        component={renderTextField}
                        placeholder={this.props.t("Claim.CLAIM_OBJECT")}
                        required
                        validate={{
                          required: {
                            value: true,
                            errorMessage: this.props.t(
                              "ErrorMsg.REQUIRED_FIELD"
                            ),
                          },
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">
                        {this.props.t("Claim.OBSERVATIONS")}
                      </Label>
                      <AvField
                        name="claimDetails"
                        type="textarea"
                        tag={Field}
                        component={renderTextField}
                        placeholder={this.props.t("Claim.OBSERVATIONS")}
                      />
                    </FormGroup>
                  </div>
                  <Label className="c-lable " for="exampleEmail">
                    {this.props.t("Claim.ATTACHEMENTS")}
                  </Label>
                  <br />
                  <Row>
                    <Col md={6}>
                      <label for="file1" class="tx-l doc btn">
                        <i class="text-dark font-weight-bold fas fa-paperclip"></i>
                        &nbsp;
                        {this.props.t("Claim.SELECT_TICKET")}
                      </label>
                      <Input
                        id="file1"
                        type="file"
                        className="d-none"
                        name="myFile"
                        onChange={(e) => this.uploadFile(e, "ticket")}
                        required
                        accept="image/png, image/jpeg, image/bmp, image/gif, image/pdf"
                      />
                      <p>{this.currentFile}</p>
                    </Col>
                    <Col md={6} className="">
                      <label for="file2" class="tx-l btn doc">
                        <i class="text-dark font-weight-bold fas fa-paperclip"></i>
                        &nbsp;
                        {this.props.t("Claim.SELECT_CLAIM")}
                      </label>
                      <Input
                        id="file2"
                        type="file"
                        className="d-none"
                        name="myFile"
                        onChange={(e) => this.uploadClaimFile(e, "claim")}
                        accept="image/png, image/jpeg, image/bmp, image/gif, image/pdf"
                      />
                      <p>{this.currentClaimFile}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={3} lg={3} className="mx-auto mt-5">
                  <SubmitBtnLoader
                    label="Ajouter"
                    className="btn-primary btn-lg mx-3 btn-width"
                    loading={this.state.loading}
                    submitting={""}
                    type="submit"
                    onClick={() => this.props.scrollUp()}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </AvForm>
      </Fragment>
    );
  }
}
CreateInitialClaim = reduxForm({
  form: "CreateInitialClaim",
  // enableReinitialize: true,
})(CreateInitialClaim);

const mapStateToProps = (state) => {
  console.log(state);
  return {
    // categoryData: state.category.categoryData,
    // subCategoryDataByCategory: state.subCategory.subCategoryDataByCategory,
    // stationData: state.station.stationData,
    postClaimData: state.claim.postClaimData,
  };
};

export default compose(translate, connect(mapStateToProps))(CreateInitialClaim);
