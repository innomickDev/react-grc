import React, { Fragment } from "react";
import { Input, FormFeedback, FormText, CustomInput } from "reactstrap";

export const renderTextField = ({
  input,
  meta: { touched, error, warning },
  ...custom
}) => (
  <Fragment>
    <Input {...(touched ? { valid: error } : {})} {...input} {...custom} />
    {error && <FormFeedback>{error}</FormFeedback>}
    {!error && warning && <FormText>{warning}</FormText>}
  </Fragment>
);

export const renderCustomField = ({
  input,
  meta: { touched, error, warning },
  ...custom
}) => (
  <Fragment>
    <CustomInput
      {...(touched ? { valid: error } : {})}
      {...input}
      {...custom}
    />
    {error && <FormFeedback>{error}</FormFeedback>}
    {!error && warning && <FormText>{warning}</FormText>}
  </Fragment>
);

export const renderSelectField = ({
  input,
  meta: { touched, error, warning },
  ...custom
}) => (
  <Fragment>
    <select
      {...(touched ? { valid: error } : {})}
      {...input}
      value={input.value ? input.value : custom.defaultValue}
      {...custom}
    />
    {error && <FormFeedback>{error}</FormFeedback>}
    {!error && warning && <FormText>{warning}</FormText>}
  </Fragment>
);
