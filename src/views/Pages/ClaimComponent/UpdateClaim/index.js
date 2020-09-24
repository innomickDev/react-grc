import React, { Fragment } from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import { Field, reduxForm } from "redux-form";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {
  renderSelectField,
  renderTextField,
} from "../../CommonComponents/RenderTextField";

import {
  getClaimsbyCode,
  updateClaimByAgent,
  getClaimChannel,
} from "../../../../actions/claimAction";
import moment from "moment";
import { getStations } from "../../../../actions/stationAction";
import { getCategories } from "../../../../actions/categoryAction";
import { getTrainType } from "../../../../actions/trainTypeAction";
import { getTarif } from "../../../../actions/tarifAction";
import {
  getLangBasedItems,
  getLangBasedStations,
  getBase64,
  showError,
  showSuccess,
  calenderDate,
  dateTimeFormat,
  calenderFormat,
} from "../../../../helpers";
import Datetime from "react-datetime";
import { getSubCategoriesByCategory } from "../../../../actions/subCategoryAction";
import {
  updateTicketAttachment,
  updateClaimAttachment,
} from "../../../../actions/claimAction";
import _ from "lodash";
import qString from "query-string";
import SubmitBtnLoader from "../../CommonComponents/SubmitBtnLoader";
import LoaderComponent from "../../CommonComponents/Loader";
import "moment/locale/fr"; // without this line it won't work
moment.locale("fr");
export class UpdateClaim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFields: false,
      loading: false,
      mainLoader: true,
      initialDate: null,
      depStation: '',
      arrStation: ''
    };
  }
  componentDidMount = () => {
    const params = qString.parse(this.props.location.search);
    this.props.dispatch(getClaimsbyCode(params.code));
    this.props.dispatch(getCategories());
    this.props.dispatch(getStations());
    this.props.dispatch(getClaimChannel());
    this.props.dispatch(getTrainType());
    this.props.dispatch(getTarif());
    window.scrollTo(0, 0);
    // this.props.dispatch(getClaimsbyCode(params.code));
  };
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.categoryData &&
      nextProps.categoryData !== this.props.categoryData
    ) {
      // console.log(nextProps.categoryData);
      this.setState({
        categoryData: nextProps.categoryData,
      });
      const params = qString.parse(this.props.location.search);
    }
    if (
      nextProps.subCategoryDataByCategory &&
      nextProps.subCategoryDataByCategory !==
      this.props.subCategoryDataByCategory
    ) {
      this.setState({
        subCategoryDataByCategory: nextProps.subCategoryDataByCategory,
      });
    }
    if (
      nextProps.stationData &&
      nextProps.stationData !== this.props.stationData
    ) {
      // console.log(nextProps.stationData);
      this.setState({
        stationData: nextProps.stationData,
        mainLoader: false,
      });
    }
    if (
      nextProps.channelData &&
      nextProps.channelData !== this.props.channelData
    ) {
      this.setState({
        channelData: nextProps.channelData,
      });
    }
    if (nextProps.tarifData && nextProps.tarifData !== this.props.tarifData) {
      // console.log(nextProps.tarifData);
      this.setState({
        tarifData: nextProps.tarifData,
      });
    }
    if (
      nextProps.trainTypeData &&
      nextProps.trainTypeData !== this.props.trainTypeData
    ) {
      // console.log(nextProps.trainTypeData);
      this.setState({
        trainTypeData: nextProps.trainTypeData,
      });
    }
    if (
      nextProps.isUpdateError &&
      nextProps.isUpdateError !== this.props.isUpdateError
    ) {
      showError(nextProps.isUpdateError);
      this.setState({ loading: false });
    }
    if (
      nextProps.isUpdateSuccess &&
      nextProps.isUpdateSuccess !== this.props.isUpdateSuccess
    ) {
      showSuccess(this.props.t("Claim.CLAIM_UPDATED_SUCCESSFULLY"));
      this.setState({ loading: false });
      const params = qString.parse(this.props.location.search);
      this.props.history.push(`/pages/claim-details?code=${params.code}`);
    }
    if (
      nextProps.initialValues &&
      nextProps.initialValues !== this.props.initialValues
    ) {
      console.log(nextProps.initialValues);
      this.setState({
        initialDate: nextProps.initialValues,
      });
      this.props.dispatch(
        getSubCategoriesByCategory(nextProps.initialValues.category.code)
      );
      if (nextProps.initialValues.eventLocation === "Gare") {
        this.setState({ showFields: false, showEventStation: true });
      }
      if (nextProps.initialValues.eventLocation === "Train") {
        this.setState({ showFields: true, showEventStation: false });
      }
    }
  };

  showOptions = (data) => {
    // console.log(data);
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

  // get sub category by categoryID
  getSubCategoriesByCategory = (e) => {
    // console.log(e.target.value);
    if (e.target.value !== "0") {
      const category = _.find(this.state.categoryData.categoryClients, {
        code: e.target.value,
      });
      // console.log(category);
      // this.setState({ showSubSubCategory: category.isRequiredSubSubCategory });
      // console.log(category);
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
    console.log(formProps);
    if (formProps.eventLocation !== "Train") {
      delete formProps.departureHour;
      delete formProps.departureStationCode;
      delete formProps.arrivalStationCode;
      delete formProps.arrivalHour;
      delete formProps.trainClassificationCode;
      delete formProps.trainNumber;
      delete formProps.tarifCode;
      // coming from initial values
      delete formProps.arrivalStation;
      delete formProps.departureStation;
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
      formProps.userEmail = this.props.userData.email;
    }
    if (this.state.startDate) {
      // alert(String(new Date(this.state.startDate).getTime()).length);
      // return false;
      formProps.eventDate = String(new Date(this.state.startDate).getTime())

    } else if (this.state.initialDate.eventDate) {
      formProps.eventDate = String(Number(this.state.initialDate.eventDate) * 1000)
    }
    if (this.state.endDate) {
      formProps.travelDate = String(new Date(this.state.endDate).getTime());
    } else if (this.state.initialDate.travelDate) {
      // alert(this.state.initialDate.travelDate);
      // return false;
      formProps.travelDate = String(Number(this.state.initialDate.travelDate) * 1000)
    }
    if (this.state.ticketAttachment) {
      formProps.ticketAttachment = this.state.ticketAttachment.split(",")[1];
    }
    if (this.state.claimAttachment) {
      formProps.claimAttachment = this.state.claimAttachment.split(",")[1];
    }
    const params = qString.parse(this.props.location.search);
    const ticketUpdateRequest = {
      code: params.code ? parseInt(params.code) : "",
      attachment: this.state.ticketAttachment
        ? this.state.ticketAttachment.split(",")[1]
        : "",
    };
    if (this.state.ticketAttachment) {
      this.props.dispatch(updateTicketAttachment(ticketUpdateRequest));
    }
    // for claim
    const claimUpdateRequest = {
      code: params.code ? parseInt(params.code) : "",
      attachment: this.state.claimAttachment
        ? this.state.claimAttachment.split(",")[1]
        : "",
    };
    if (this.state.claimAttachment) {
      this.props.dispatch(updateClaimAttachment(claimUpdateRequest));
    }

    if (formProps.claimCode) {
      this.props.dispatch(updateClaimByAgent(formProps));
      this.setState({
        loading: true,
      });
    }
  };
  showList = (e) => {
    const value = e.target.value;
    if (value === "Train") {
      this.setState({ showFields: true });
    } else {
      this.setState({ showFields: false });
    }
  };
  showList = (e) => {
    if (e.target.value === "Train") {
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

  showTrainTypes = (data) => {
    if (data && data.length) {
      return data.map((type, key) => {
        return (
          //todo need to discuss this point
          <option value={type.codeClassification} key={key}>
            {type.designation}
          </option>
        );
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
    if (e.target.value != this.state.depStation) {
      this.setState({
        arrStation: e.target.value
      })
    } else {
      showError("La station doit être différente")
    }
  }

  render() {
    const { handleSubmit } = this.props;
    // console.log(new Date(Number("1592487970")));
    console.log(this.state.endDate);
    console.log(this.state.initialDate);
    // console.log(this.props.stationData);
    // console.log(this.props.categoryData);
    // console.log(this.props.subCategoryDataByCategory);
    return (
      <Fragment>
        <LoaderComponent loading={this.state.mainLoader} />
        <div className="full-page-content">
          <Container>
            <AvForm noValidate onSubmit={handleSubmit(this.onSubmit)}>
              {/* <div className='card-header-c' id='checkbx-design'>
            <Input type='checkbox' id='checkbox2' />
            <span>Espace Reclamation :</span>
          </div> */}
              <br />
              <div className="card-header-c">
                <span>{this.props.t("Claim.TO_CLOSE_IMMEDIATELY")}</span>
              </div>
              <Card className="p-3" id="ic-card">
                <CardBody>
                  <Row>
                    <Col md={4} lg={4}>
                      <Label for="exampleEmail">
                        {this.props.t("Claim.CLAIM_ID")}
                      </Label>
                      <FormGroup>
                        <AvField
                          name="claimCode"
                          type="text"
                          component={renderTextField}
                          placeholder={this.props.t("Claim.CLAIM_ID")}
                          tag={Field}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4} lg={4}>
                      <FormGroup>
                        <Label for="exampleEmail">
                          {this.props.t("Claim.CLAIM_CHANNEL")}
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
                          {this.props.t("Claim.CLAIM_SRC")}
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
                          {this.props.t("Claim.DATE_OF_FILLING_COMPLAINT")}
                        </Label>
                        <Datetime
                          closeOnSelect
                          value={
                            this.state.endDate
                              ? this.state.endDate
                              : this.state.initialDate
                                ? calenderFormat(
                                  this.state.initialDate.travelDate
                                )
                                : ""
                          }
                          timeFormat={false}
                          dateFormat
                          inputProps={{
                            readOnly: true,
                            placeholder: this.props.t(
                              "Claim.DATE_OF_FILLING_COMPLAINT"
                            ),
                          }}
                          // isValidDate={this.minDate}
                          onChange={(e) => this.endDate(e)}
                        />
                      </FormGroup>
                    </Col>{" "}
                    <Col md={4} lg={4}>
                      <FormGroup>
                        <Label for="exampleSelect">
                          {this.props.t("Claim.CLAIM_CATEGORY")}
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
                          {this.props.t("Claim.COMPLAINT_SUBCATEGORY")}
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
                          {this.props.t("Claim.EVENT_DATE")}
                        </Label>
                        <Datetime
                          closeOnSelect
                          // onBlur={this.focousOut}
                          value={this.state.startDate}
                          value={
                            this.state.startDate
                              ? this.state.startDate
                              : this.state.initialDate
                                ? calenderFormat(this.state.initialDate.eventDate)
                                : ""
                          }
                          timeFormat={false}
                          dateFormat
                          inputProps={{
                            readOnly: true,
                            placeholder: this.props.t("Claim.EVENT_DATE"),
                          }}
                          // isValidDate={this.minDate}
                          onChange={(e) => this.startDate(e)}
                        />
                      </FormGroup>
                    </Col>{" "}
                    <Col md={4} lg={4}>
                      <FormGroup>
                        <Label for="exampleSelect">
                          {this.props.t("Claim.EVENT_LOCATION")}*
                        </Label>
                        <Field
                          type="select"
                          component={"select"}
                          className="form-control"
                          name="eventLocation"
                          id="exampleSelect"
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
                            {this.props.t("Claim.EVENT_STATION")}
                          </Label>
                          <Field
                            component={"select"}
                            name="eventStationCode"
                            className="form-control"
                            id="exampleSelect"
                          >
                            <option value="">
                              {this.props.t("Claim.EVENT_STATION")}
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
                          <AvField
                            name="departureHour"
                            type="time"
                            component={renderTextField}
                            placeholder={this.props.t("Claim.DEPARTURE_TIME")}
                            tag={Field}
                          // disabled={this.props.initialValues}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4} lg={4}>
                        <Label className="c-lable " for="exampleEmail">
                          {this.props.t("Claim.DEPARTURE_STATION")}
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
                          {this.props.t("Claim.ARRIVAL_STATION")}
                        </Label>
                        <FormGroup>
                          <Field
                            name="arrivalStationCode"
                            component={"select"}
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
                            placeholder="Type de train"
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
                          {this.props.t("Claim.RATE")}
                        </Label>
                        <FormGroup>
                          <Field
                            name="tarifCode"
                            type="select"
                            component={"select"}
                            placeholder="Tarif"
                            className="form-control"
                          >
                            <option value="">
                              {this.props.t("Claim.SELECT_RATE")}
                            </option>
                            {this.showOptions(
                              this.props.tarifData
                                ? getLangBasedItems(
                                  this.props.tarifData.listTarif
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
                  <br />
                  <Row className="rm-z-index">
                    <Col md={7}>
                      <div className="rm-b">
                        <br />
                        <FormGroup>
                          <Label for="exampleEmail">
                            {this.props.t("Claim.CLAIM_OBJECT")}
                          </Label>
                          <AvField
                            name="claimSubject"
                            type="textarea"
                            tag={Field}
                            component={renderTextField}
                            placeholder={this.props.t("Claim.CLAIM_OBJECT")}
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
                        label={this.props.t("Claim.MODIFY")}
                        className="btn-primary btn-lg mx-3 btn-width"
                        loading={this.state.loading}
                        submitting={""}
                        type="submit"
                        disabled={this.props.initialValues}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </AvForm>
          </Container>
        </div>
      </Fragment>
    );
  }
}
UpdateClaim = reduxForm({
  form: "UpdateClaim",
  //   enableReinitialize: true,
})(UpdateClaim);

const mapStateToProps = (state) => {
  console.log(state.claim.initialValues);
  return {
    categoryData: state.category.categoryData,
    subCategoryDataByCategory: state.subCategory.subCategoryDataByCategory,
    stationData: state.station.stationData,
    channelData: state.claim.channelData,
    trainTypeData: state.trainType.getTrinType,
    tarifData: state.tarif.getTarifData,
    initialValues: state.claim.getClaimsbyCodeData,
    isUpdateError: state.claim.isUpdateError,
    isUpdateSuccess: state.claim.isUpdateSuccess,
  };
};

export default compose(translate, connect(mapStateToProps))(UpdateClaim);
