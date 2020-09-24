import React, { Fragment } from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Label,
  FormGroup,
  Button,
} from "reactstrap";
import bgImage from "../../../assets/img/plain-white.jpg";
import PopupModel from "./PopupModel";
import { Field, reduxForm } from "redux-form";
import { createCustomer } from "../../../actions/createCustomer";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {
  renderTextField
} from "../CommonComponents/RenderTextField";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { getClaimChannel } from "../../../actions/claimAction";
import { getStations } from "../../../actions/stationAction";
import { CreateInitialClaim } from "./claim";
import { getCategories } from "../../../actions/categoryAction";
import { getTrainType } from "../../../actions/trainTypeAction";
import { getTarif } from "../../../actions/tarifAction";
import { showError, showSuccess } from "../../../helpers";
import { searchCustomerDetails } from "../../../actions/searchCustomer";
import LoaderComponent from "../CommonComponents/Loader";
import * as base from "../../../actions/baseAction";
import { SEARCH_CUSTOMER_DATA } from "../../../actions/actionTypes";
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class InitiateClaim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showModal: false,
      disableText: false,
      userData: null,
      emailData: "",
      mainLoader: true,
    };
    this.stateRef = React.createRef();
    this.stateRefChild = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch(getStations());
    this.props.dispatch(getCategories());
    this.props.dispatch(getClaimChannel());
    window.scrollTo(0, 0);
  }
  componentWillMount() {
    this.props.dispatch(base.getRequest(SEARCH_CUSTOMER_DATA.GET_CUSTOMER_REQUEST));

  }

  componentWillReceiveProps = (nextProps, props) => {
    if (
      nextProps.categoryData &&
      nextProps.categoryData !== this.props.categoryData
    ) {
      this.setState({
        categoryData: nextProps.categoryData,
      });
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
      nextProps.initialValues &&
      nextProps.initialValues !== this.props.initialValues
    ) {
      this.setState({ userData: nextProps.initialValues, showModal: false });
      this.scrollUp = () => { };
    }
    if (
      nextProps.stationData &&
      nextProps.stationData !== this.props.stationData
    ) {
      this.setState({
        stationData: nextProps.stationData,
        mainLoader: false,
      });
    }
    if (
      nextProps.customerRegistration &&
      nextProps.customerRegistration !== this.props.customerRegistration
    ) {
      this.props.dispatch(
        searchCustomerDetails({ email: this.state.emailData })
      );
      showSuccess("Le client est ajouté avec succès");
      this.scrollUp = () => { };
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
      this.setState({
        tarifData: nextProps.tarifData,
      });
    }
    if (
      nextProps.trainTypeData &&
      nextProps.trainTypeData !== this.props.trainTypeData
    ) {
      this.setState({
        trainTypeData: nextProps.trainTypeData,
      });
    }

    if (
      nextProps.postClaimData &&
      nextProps.postClaimData !== this.props.postClaimData
    ) {
      this.setState({
        postClaimData: nextProps.postClaimData,
      });
    }

    if (
      nextProps.successClaimCode &&
      nextProps.successClaimCode !== this.props.successClaimCode
    ) {
      this.props.history.push(
        `/pages/claim-details?code=${nextProps.successClaimCode}`
      );
    }
    if (nextProps !== props) {
      this.setState({
        errorData: nextProps.isCreateClaimError,
      });
    }
    if (nextProps.isGetCustomerFail && nextProps.isGetCustomerFail !== this.props.isGetCustomerFail) {
      // showError(this.props.t("Claim.CUSTOMER_DATA_NOT_FOUND"));
      showError(nextProps.isGetCustomerFail);
    }
    if (nextProps.customerRegistrationFail && nextProps.customerRegistrationFail !== this.props.customerRegistrationFail) {
      showError(nextProps.customerRegistrationFail);
    }
    if (nextProps.isNoSubCategory && nextProps.isNoSubCategory !== this.props.isNoSubCategory) {
      showError(nextProps.isNoSubCategory);
      this.setState({ resetSubCategory: nextProps.isNoSubCategory, subCategoryDataByCategory: null })
    }
  };
  handleFileInput = (e, type) => {
    this.refs[type].click(e);
  };
  scrollDown = () => {
    this.stateRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  scrollUp = () => {
    this.stateRefChild.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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

  uploadFile(event) {
    let file = event.target.files[0];
    // console.log(file);

    if (file) {
      let data = new FormData();
      data.append("file", file);
      // axios.post('/files', data)...
    }
  }
  openModal = () => {
    this.setState({
      showModal: true,
    });
  };
  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };
  onSubmit = (formProps) => {
    if (formProps.civilite === "0") {
      delete formProps.civilite;
    }
        if (
            formProps.prenom &&
            formProps.email &&
            formProps.nom
        ) {
            this.setState({
                emailData: formProps.email,
            });
            const requestData = {
                // CIN: formProps.Cin,
                civility: formProps.civilite,
                prenom: formProps.prenom,
                nom: formProps.nom,
                tel: formProps.tel,
                pays: formProps.pays,
                ville: formProps.ville,
                email: formProps.email,
                adresse: formProps.adresse,
                profession: formProps.profession,
            };
            if(formProps.civilite) {
                this.props.dispatch(createCustomer(requestData));
                this.setState({ disableText: true }, () => {
                    this.scrollDown();
                });
            } else {
                showError(this.props.t("Claim.PLEASE_SELECT_CIVILITY_AS_REQUIRED_FIELD"));
            }
        }
     else {
        showError(this.props.t("Claim.PLEASE_FILL_ALL_REQUIRED_FIELDS"));
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Fragment>
        <LoaderComponent loading={this.state.mainLoader} />
        {this.state.showModal && (
          <PopupModel
            isOpen={this.state.showModal}
            handleModal={this.handleModal}
          />
        )}

        <div>
          <div className="full-page-content">
            <div className="login-page">
              <Container>
                <AvForm
                  className="px-5"
                  noValidate
                  onSubmit={handleSubmit(this.onSubmit)}
                >
                  <div className="card-header-c" ref={this.stateRefChild}>
                    <span>{this.props.t("Claim.CLIENT_AREA")}</span>
                  </div>
                  <Card className="p-3" id="ic-card">
                    <CardBody>
                      <Row>
                        {/* left data */}
                        <Col md={6} lg={6}>
                          <Row>
                            <Label md={3}>
                              {this.props.t("Claim.CIVILITY")}
                                <span className="text-danger">*</span>
                            </Label>
                            <Col xs={12} md={9}>
                              <FormGroup>
                                <Field
                                  type="select"
                                  name="civilite"
                                  component="select"
                                  id="exampleSelect"
                                  className="form-control"
                                >
                                  <option>
                                    {this.props.t("Claim.SELECT_CIVILITY")}
                                  </option>
                                  <option value="1">
                                    {this.props.t("Claim.MR")}
                                  </option>
                                  <option value="2">
                                    {this.props.t("Claim.MS")}
                                  </option>
                                  <option value="3">
                                    {this.props.t("Claim.MRS")}
                                  </option>
                                </Field>
                              </FormGroup>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Label md={3}>
                              {this.props.t("Claim.FIRST_NAME")}{" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <Col xs={12} md={9}>
                              <FormGroup>
                                <AvField
                                  name="prenom"
                                  type="text"
                                  component={renderTextField}
                                  placeholder={this.props.t("Claim.FIRST_NAME")}
                                  validate={{ firstName: true }}
                                  required
                                  tag={Field}
                                  validate={{
                                    required: {
                                      value: true,
                                      errorMessage: this.props.t(
                                        "ErrorMsg.REQUIRED_FIELD"
                                      ),
                                    },
                                  }}
                                  disabled={
                                    this.props.initialValues ||
                                    this.state.disableText
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Label md={3}>
                              {this.props.t("Claim.LAST_NAME")}{" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <Col xs={12} md={9}>
                              <FormGroup>
                                <AvField
                                  name="nom" //last name
                                  type="text"
                                  component={renderTextField}
                                  placeholder={this.props.t("Claim.LAST_NAME")}
                                  tag={Field}
                                  required
                                  validate={{
                                    required: {
                                      value: true,
                                      errorMessage: this.props.t(
                                        "ErrorMsg.REQUIRED_FIELD"
                                      ),
                                    },
                                  }}
                                  disabled={
                                    this.props.initialValues ||
                                    this.state.disableText
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Label md={3}>{this.props.t("Claim.EMAIL")}{" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <Col xs={12} md={9}>
                              <FormGroup>
                                <AvField
                                  name="email"
                                  type="text"
                                  component={renderTextField}
                                  placeholder={this.props.t("Claim.EMAIL")}
                                  validate={{ email: true }}
                                  validate={{
                                    required: {
                                      value: true,
                                      errorMessage: this.props.t(
                                        "ErrorMsg.REQUIRED_FIELD"
                                      ),
                                    },
                                    pattern: {
                                      value: EMAIL_REGEX,
                                      errorMessage: this.props.t(
                                        "ErrorMsg.WRONG_EMAIL"
                                      ),
                                    },
                                  }}
                                  required
                                  tag={Field}
                                  disabled={
                                    this.props.initialValues ||
                                    this.state.disableText
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <br />
                        </Col>

                        {/*  right data */}
                        <Col md={6} lg={6}>
                          <Row>
                            <Label md={3}>
                              {this.props.t("Claim.PROFESSION")}
                            </Label>
                            <Col xs={12} md={9}>
                              <FormGroup>
                                <AvField
                                  name="profession"
                                  type="text"
                                  component={renderTextField}
                                  placeholder={this.props.t("Claim.PROFESSION")}
                                  tag={Field}
                                  disabled={
                                    this.props.initialValues ||
                                    this.state.disableText
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Label md={3}>
                              {this.props.t("Claim.TELEPHONE")}
                            </Label>
                            <Col xs={12} md={9}>
                              <FormGroup>
                                <AvField
                                  name="tel"
                                  type="text"
                                  component={renderTextField}
                                  placeholder={this.props.t("Claim.TELEPHONE")}
                                  tag={Field}
                                  disabled={
                                    this.props.initialValues ||
                                    this.state.disableText
                                  }
                                  validate={{
                                    required: {
                                      value: false,
                                      errorMessage: this.props.t(
                                        "ErrorMsg.MOBILE_ERROR"
                                      ),
                                    },
                                    pattern: {
                                      value: "^[0-9]+$",
                                      errorMessage: this.props.t(
                                        "ErrorMsg.MOBILE_ERROR"
                                      ),
                                    },
                                    maxLength: {
                                      value: 10,
                                    },
                                  }}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Label md={3}>
                              {this.props.t("Claim.COUNTRY")}
                            </Label>
                            <Col xs={12} md={9}>
                              <FormGroup>
                                <AvField
                                  name="pays"
                                  type="text"
                                  component={renderTextField}
                                  placeholder={this.props.t("Claim.COUNTRY")}
                                  tag={Field}
                                  disabled={
                                    this.props.initialValues ||
                                    this.state.disableText
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Label md={3}>{this.props.t("Claim.CITY")}</Label>
                            <Col xs={12} md={9}>
                              <FormGroup>
                                <AvField
                                  name="ville"
                                  type="text"
                                  component={renderTextField}
                                  placeholder={this.props.t("Claim.CITY")}
                                  tag={Field}
                                  disabled={
                                    this.props.initialValues ||
                                    this.state.disableText
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Label md={3}>{this.props.t("Claim.ADDRESS")}{" "}
                          <span className="text-danger"></span>
                        </Label>
                        <Col xs={12} md={12}>
                          <FormGroup>
                            <AvField
                              name="adresse"
                              type="text"
                              component={renderTextField}
                              placeholder={this.props.t("Claim.ADDRESS")}
                              // validate={{ address: true }}
                              tag={Field}
                              disabled={
                                this.props.initialValues ||
                                this.state.disableText
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          md={6}
                          lg={6}
                          className="mx-auto mt-5 d-inline-flex"
                        >
                          <Button
                            color="primary"
                            size="lg"
                            className="mb-3 border-rm mx-3 btn-width"
                            onClick={this.openModal}
                          // disabled={this.props.initialValues}
                          >
                            {this.props.t("Claim.SEARCH")}
                          </Button>
                          <Button
                            color="primary"
                            size="lg"
                            type="submit"
                            className="mb-3 border-rm mx-3 btn-width"
                            disabled={
                              this.props.initialValues || this.state.disableText
                            }
                          >
                            {this.props.t("Claim.ADD")}
                          </Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <br />
                </AvForm>
                <div ref={this.stateRef}>
                  <CreateInitialClaim
                    stationData={this.state.stationData}
                    categoryData={this.state.categoryData}
                    subCategoryDataByCategory={
                      this.state.subCategoryDataByCategory
                    }
                    tarifData={this.state.tarifData}
                    trainTypeData={this.state.trainTypeData}
                    channelData={this.state.channelData}
                    userData={this.state.userData}
                    t={this.props.t}
                    postClaimData={this.state.postClaimData}
                    scrollUp={this.scrollUp}
                    errorData={this.state.errorData}
                    resetSubCategory={this.state.resetSubCategory}
                  />
                </div>
              </Container>
            </div>
          </div>

          <div
            className="full-page-background"
            style={{ backgroundImage: "url(" + bgImage + ")" }}
          />
        </div>
      </Fragment>
    );
  }
}
InitiateClaim = reduxForm({
  form: "InitiateClaim",
  enableReinitialize: true,
})(InitiateClaim);
const mapStateToProps = (state) => {
  return {
    channelData: state.claim.channelData,
    customerRegistration: state.createCustomer.customerRegistration,
    initialValues: state.serachCustomerInfo.isGetCustomer,
    stationData: state.station.stationData,
    categoryData: state.category.categoryData,
    subCategoryDataByCategory: state.subCategory.subCategoryDataByCategory,
    tarifData: state.tarif.getTarifData,
    trainTypeData: state.trainType.getTrinType,
    postClaimData: state.claim.postClaimData,
    successClaimCode: state.claim.successClaimCode,
    isCreateClaimError: state.claim.isCreateClaimError ? state.claim.isCreateClaimError : null,
    isGetCustomerFail: state.serachCustomerInfo.isGetCustomerFail,
    customerRegistrationFail: state.createCustomer.customerRegistrationFail,
    isNoSubCategory: state.subCategory.isNoSubCategory
  };
};

export default compose(translate, connect(mapStateToProps))(InitiateClaim);
