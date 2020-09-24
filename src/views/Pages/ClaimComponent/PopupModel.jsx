import React, { Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import { translate } from "react-multi-lang";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  CardBody,

} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "../CommonComponents/RenderTextField";
import { searchCustomerDetails } from "../../../actions/searchCustomer";
import {showError} from "../../../helpers";
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class PopupModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  componentWillReceiveProps(nextProps, props) {
    if(nextProps.initialValues){
      showError('Please try again');
    }
  }

  onSubmit = (formProps) => {
    console.log(formProps)
    if (EMAIL_REGEX.test(formProps.Email)) {
      const requestData = {

        email: formProps.Email //todo
      };
      this.props.dispatch(searchCustomerDetails(requestData));
    }
  };

  handleModal = () => {
    this.props.handleModal();
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Fragment>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.handleModal}
          className="text-center login-modal"
        >
          <ModalHeader
            className="custom-position"
            toggle={this.handleModal}
            tag="h4"
          >
            &nbsp;
          </ModalHeader>
          <ModalBody>
            <AvForm noValidate onSubmit={handleSubmit(this.onSubmit)}>
              {this.props.t("Claim.ENTER_A_EMAIL_ADDRESS")}
              <CardBody className="px-5 form-validation loginError">
                <FormGroup>
                  <AvField
                    className="form-control loginValidation"
                    tag={Field}
                    component={renderTextField}
                    type="text"
                    name="Email"
                    placeholder={this.props.t("Claim.ENTER_A_EMAIL_ADDRESS")}
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
                  />
                </FormGroup>
                <Button className="btn btn-primary">
                  {this.props.t("Claim.SEARCH")}
                </Button>
              </CardBody>
            </AvForm>
          </ModalBody>
          <ModalFooter />
        </Modal>
      </Fragment>
    );
  }
}

PopupModel = reduxForm({
  form: "AddCategory",
})(PopupModel);

export default compose(translate, withRouter)(PopupModel);
