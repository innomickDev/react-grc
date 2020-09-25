import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Container,
  FormGroup,
} from "reactstrap";
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import bgImage from "assets/img/login-bg.jpg";
import companyLogo from "assets/img/svg/logo.svg";
import { Field, reduxForm } from "redux-form";
import { loginSubmit } from "../../actions/loginAction";
import { showError } from "helpers";
import SubmitBtnLoader from "../Pages/CommonComponents/SubmitBtnLoader";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "./CommonComponents/RenderTextField";
import getUserProfileData from "../service/profileService";
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class LoginPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  // Prevent redirection to login
  componentWillMount = () => {
    if (this.props.location.search === "?isExpired=1") {
      return false;
    } else {
      if (localStorage.getItem("foGRCUserProfileData")) {
        this.props.history.push("/pages/research-claim");
      }
    }
  };

  /* function for validate email */
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
  /**
   * call this function to validate password
   */
  validatePassword = (e) => {
    if (e.target.value) {
      this.setState({
        passwordValidation: true,
      });
    } else {
      this.setState({
        passwordValidation: false,
      });
    }
  };
  componentWillReceiveProps = (nextProps, props) => {
    if (
      nextProps.isAuthenticated &&
      nextProps.isAuthenticated !== this.props.isAuthenticated
    ) {
      getUserProfileData(this.props.dispatch).then((response) => {
        if (response.isSuccess) {
          this.props.history.push("/pages/research-claim");
        }
      }).catch((error) => {
    
      });
    }
    if (
      nextProps.loginSuccess &&
      nextProps.loginSuccess !== this.props.loginSuccess
    ) {
      this.setState({ loading: false });
    }
    if (
      nextProps.loginError &&
      nextProps.loginError !== this.props.loginError
    ) {
      showError(nextProps.loginError);
      this.setState({ loading: false });
    }
  };
  // function for submit the login result
  onSubmit = (formProps) => {
    if (this.state.emailValidation && this.state.passwordValidation) {
      const requestData = {
        email: formProps.Email,
        password: formProps.Password,
      };

      this.props.dispatch(loginSubmit(requestData));
      this.setState({ loading: true });
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="full-page-content">
          <div className="login-page">
            <Container fluid>
              <Col xs={12} md={5} lg={5} className="">
                <AvForm onSubmit={handleSubmit(this.onSubmit)}>
                  <Card className="card-login card-plain login-card">
                    <CardHeader className="text-center m-4">
                      <img src={companyLogo} alt="oncf" />
                    </CardHeader>
                    <CardBody className="px-5" id="login-form">
                      <FormGroup>
                        <AvField
                          name="Email"
                          tag={Field}
                          component={renderTextField}
                          placeholder={this.props.t("Login.EMAIL")}
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
                      <br />
                      <FormGroup>
                        <AvField
                          name="Password"
                          tag={Field}
                          component={renderTextField}
                          placeholder={this.props.t("Login.PASSWORD")}
                          type="password"
                          maxLength={14}
                          onChange={(e) => this.validatePassword(e)}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: this.props.t(
                                "ErrorMsg.PASSWORD_ERROR"
                              ),
                            },
                            minLength: {
                              value: 3,
                              errorMessage: this.props.t(
                                "ErrorMsg.PASSWORD_LENGTH"
                              ),
                            },
                          }}
                          required
                        />
                      </FormGroup>
                      <center>
                        <SubmitBtnLoader
                          label={this.props.t("Login.LOGIN")}
                          className="btn-primary btn-lg border-ad mt-3 btn-width"
                          loading={this.state.loading}
                          submitting={""}
                          type="submit"
                        />
                      </center>
                      <Row>
                        <Col md={12} className="my-3">
                          <a
                            href="javascript:void(0)"
                            className="text-light pull-right text-light"
                            onClick={() =>
                              this.props.history.push("/pages/forgot-password")
                            }
                          >
                            {this.props.t("Login.FORGOT_PASSWORD")}
                          </a>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                </AvForm>
              </Col>
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
LoginPageComponent = reduxForm({
  form: "LoginForm",
})(LoginPageComponent);

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.login.isAuthenticated,
    isAuthenticating: state.login.isAuthenticating,
    loginSuccess: state.login.loginSuccess,
    loginError: state.login.loginError,
    account: state.account
  };
};

export default compose(translate, connect(mapStateToProps))(LoginPageComponent);
