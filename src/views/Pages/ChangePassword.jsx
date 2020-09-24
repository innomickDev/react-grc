import React from "react";
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import { Field, reduxForm } from "redux-form";
import { renderTextField } from "./CommonComponents/RenderTextField";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Container,
  Col,
  FormGroup,
} from "reactstrap";
import forgotPassword from "assets/img/forgot-password.png";
import bgImage from "assets/img/plain-white.jpg";
import { showError, showSuccess } from "../../helpers";
import SubmitBtnLoader from "../Pages/CommonComponents/SubmitBtnLoader";
import { confirmForgottenPassword } from "../../actions/accoutAction";
import { changePassword } from "../../actions/accoutAction";
import {
  CheckIfEmailIsValid,
} from "../../helpers/StringUtils";
const PASSWORD_REGEX = /^(?=.{8,})((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])).*$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class ChangePasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  // function for validate email
  validateEmailField = (e) => {
    const value = e.target.value;
    if (value.length > 0) {
      if (!CheckIfEmailIsValid(value)) {
        this.setState({ emailError: true, enableEmail: false });
      } else {
        this.setState({ emailError: false });
      }
    } else {
      this.setState({ enableEmail: true });
    }
  };
  // function for validate password
  validateConfirmCode = (e) => {
    if (e.target.value.length <= 20) {
      this.setState({
        validateConfirmCode: true,
      });
    } else {
      this.setState({
        validateConfirmCode: false,
      });
    }
  };
  validateEmail = (e) => {
    if (EMAIL_REGEX.test(e.target.value)) {
      this.setState({
        emailValidation: true,
      });
    } else {
      this.setState({
        emailValidation: false,
      });
    }
  };

  validatePassword = (e) => {
    if (PASSWORD_REGEX.test(e.target.value)) {
      this.setState({
        passwordValidation: true,
      });
    } else {
      this.setState({
        passwordValidation: false,
      });
    }
  };
  /* Before login */
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.confirmForgottenPassword &&
      nextProps.confirmForgottenPassword !== this.props.confirmForgottenPassword
    ) {
      console.log(nextProps.confirmForgottenPassword);
      showSuccess(this.props.t("SuccessMsg.PASSWORD_CHANGED"));
      this.setState({ loading: false });
      if (!localStorage.getItem("foGRCAuthToken")) {
        this.props.history.push("/pages/login");
      } else {
        this.props.history.push("/pages/initiate-claim");
      }
    }
    if (
      nextProps.confirmForgottenPassFail &&
      nextProps.confirmForgottenPassFail !== this.props.confirmForgottenPassFail
    ) {
      showError(nextProps.confirmForgottenPassFail);
      this.setState({ loading: false });
    }
    /* chaange password  functionality */
    if (
      nextProps.changePassword &&
      nextProps.changePassword !== this.props.changePassword
    ) {
      console.log(nextProps.changePassword);
      showSuccess(this.props.t("SuccessMsg.PASSWORD_CHANGED"));
      this.setState({ loading: false });
      if (!localStorage.getItem("foGRCAuthToken")) {
        this.props.history.push("/pages/login");
      } else {
        this.props.history.push("/pages/initiate-claim");
      }
    }
    if (
      nextProps.changePassFail &&
      nextProps.changePassFail !== this.props.changePassFail
    ) {
      showError(nextProps.changePassFail);
      this.setState({ loading: false });
    }
  }
  onSubmit = (formProps) => {
    // this.state.dis = false;
    if (!localStorage.getItem("foGRCAuthToken")) {
      if (
        this.state.emailValidation &&
        this.state.passwordValidation &&
        this.state.validateConfirmCode
      ) {
        const reqData = {
          email: formProps.Email,
          confirmationCode: formProps.ConfirmationCode,
          newPassword: formProps.newPassword,
        };
        // todo validation
        this.props.dispatch(confirmForgottenPassword(reqData));
        this.setState({ loading: true });
      }
    } else {
      if (
        this.state.emailValidation &&
        this.state.passwordValidation &&
        formProps.newPassword
      ) {
        const reqData = {
          email: formProps.Email,
          oldPassword: formProps.oldPassword,
          newPassword: formProps.newPassword,
        };
        this.props.dispatch(changePassword(reqData));
        this.setState({ loading: true });
      }
    }
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="full-page-content">
          <div className="login-page">
            <Container>
              <Card className="p-3">
                <Row>
                  <Col xs={12} md={6} lg={6} className="">
                    <div className="d-flex justify-content-center">
                      <img src={forgotPassword} alt="forgot-password" />
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={6} className="">
                    <AvForm
                      className="px-5"
                      noValidate
                      onSubmit={handleSubmit(this.onSubmit)}
                    >
                      <Card className="card-plain" id="fp-card">
                        <CardHeader>
                          <p className="fp-font text-center text-dark font-weight-bold mt-4">
                            {this.props.t("ChangePassword.HEADING_CHANGE_PASS")}
                          </p>
                        </CardHeader>
                        <CardBody>
                          <FormGroup>
                            <AvField
                              name="Email"
                              tag={Field}
                              component={renderTextField}
                              placeholder={this.props.t("ChangePassword.EMAIL")}
                              type="text"
                              validate={{ email: true }}
                              onChange={(e) => this.validateEmail(e)}
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: this.props.t(
                                    "ErrorMsg.EMAIL_ERROR"
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
                            />
                          </FormGroup>
                          {!localStorage.getItem("foGRCAuthToken") ? (
                            <FormGroup>
                              <AvField
                                name="ConfirmationCode"
                                tag={Field}
                                component={renderTextField}
                                placeholder={this.props.t(
                                  "ChangePassword.CONFIRM_CODE"
                                )}
                                onChange={(e) => this.validateConfirmCode(e)}
                                type="text"
                                minLength={3}
                                maxLength={14}
                                validate={{
                                  required: {
                                    value: true,
                                    errorMessage: this.props.t(
                                      "ErrorMsg.CODE_ERROR"
                                    ),
                                  },
                                }}
                                required
                              />
                            </FormGroup>
                          ) : (
                              <FormGroup>
                                <AvField
                                  name="oldPassword"
                                  tag={Field}
                                  component={renderTextField}
                                  placeholder={this.props.t(
                                    "ChangePassword.OLD_PASSWORD"
                                  )}
                                  type="password"
                                  minLength={3}
                                  maxLength={14}
                                  onChange={(e) => this.validatePassword(e)}
                                  validate={{
                                    required: {
                                      value: true,
                                      errorMessage: this.props.t(
                                        "ErrorMsg.OLD_PASSWORD_ERROR"
                                      ),
                                    },
                                  }}
                                  required
                                />
                              </FormGroup>
                            )}
                          <FormGroup>
                            <AvField
                              name="newPassword"
                              tag={Field}
                              component={renderTextField}
                              placeholder={this.props.t(
                                "ChangePassword.NEW_PASSWORD"
                              )}
                              type="password"
                              minLength={3}
                              maxLength={14}
                              onChange={(e) => this.validatePassword(e)}
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: this.props.t(
                                    "ErrorMsg.NEW_PASSWORD_ERROR"
                                  ),
                                },
                                minLength: {
                                  value: 8,
                                  errorMessage: this.props.t(
                                    "ErrorMsg.MIN_EIGHT"
                                  ),
                                },
                                pattern: {
                                  value: PASSWORD_REGEX,
                                  errorMessage: this.props.t(
                                    "ErrorMsg.WRONG_PASSWORD"
                                  ),
                                },
                              }}
                              required
                            />
                          </FormGroup>
                          <center>
                            <SubmitBtnLoader
                              label={this.props.t("ChangePassword.SUBMIT")}
                              className="btn-primary btn-lg btn-width"
                              loading={this.state.loading}
                              type="submit"
                              submitting={""}
                            />
                          </center>
                        </CardBody>
                      </Card>
                    </AvForm>
                  </Col>
                </Row>
              </Card>
            </Container>
          </div>
        </div>
        <div
          className="full-page-background"
          style={{ backgroundImage: "url(" + bgImage + ")" }}
        />
      </div>
    );
  }
}
ChangePasswordComponent = reduxForm({
  form: "ChangePassword",
})(ChangePasswordComponent);
const mapStateToProps = (state) => {
  return {
    confirmForgottenPassword: state.account.confirmForgottenPassword,
    confirmForgottenPassFail: state.account.confirmForgottenPassFail,
    changePassword: state.account.changePassword,
    changePassFail: state.account.changePassFail,
  };
};
export default compose(
  translate,
  connect(mapStateToProps)
)(ChangePasswordComponent);
