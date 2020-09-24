import React from "react";
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import { Field, reduxForm } from "redux-form";
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Container,
  Col,
  FormGroup,
} from "reactstrap";
import fPass from "assets/img/forgot-password.png";
import bgImage from "assets/img/plain-white.jpg";
import { forgotPassword } from "../../actions/accoutAction";
import { showError, showSuccess } from "../../helpers";
import SubmitBtnLoader from "../Pages/CommonComponents/SubmitBtnLoader";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "./CommonComponents/RenderTextField";
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class ForgotPasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  // function for validate email
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

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isForgotPassword &&
      nextProps.isForgotPassword !== this.props.isForgotPassword
    ) {
      showSuccess(this.props.t("SuccessMsg.CONFIRMATION_CODE"));
      this.setState({ loading: false });
      this.props.history.push("/pages/change-password");
    }

    if (
      nextProps.forgotPasswordFail &&
      nextProps.forgotPasswordFail !== this.props.forgotPasswordFail
    ) {
      // console.log(nextProps.forgotPasswordFail);
      showError(nextProps.forgotPasswordFail);
      this.setState({ loading: false });
    }
  }
  onSubmit = (formProps) => {
    if (formProps.Email) {
      const reqData = {
        email: formProps.Email,
      };

      // todo validation
      if (this.state.emailValidation) {
        this.props.dispatch(forgotPassword(reqData));
        this.setState({
          loading: true,
        });
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
                      <img src={fPass} alt="forgot-password" />
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
                            {this.props.t("ForgotPassword.HEADING_FORGOT_PASS")}
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
                          <center>
                            <SubmitBtnLoader
                              label={this.props.t("ForgotPassword.SUBMIT")}
                              className="btn-primary btn-lg "
                              loading={this.state.loading}
                              submitting={""}
                              type="submit"
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

ForgotPasswordComponent = reduxForm({
  form: "ForgotPassword",
})(ForgotPasswordComponent);

const mapStateToProps = (state) => {
  return {
    isForgotPassword: state.account.isForgotPassword,
    forgotPasswordFail: state.account.forgotPasswordFail,
  };
};
export default compose(
  translate,
  connect(mapStateToProps)
)(ForgotPasswordComponent);
