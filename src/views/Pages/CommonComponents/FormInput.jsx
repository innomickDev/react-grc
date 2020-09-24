import React from "react";
import { translate } from "react-multi-lang";
import PropTypes from "prop-types";
import compose from "compose-function";
import { connect } from "react-redux";
import {
    FormGroup,
    FormFeedback,
    FormText,
    InputGroup,
    Input
} from "reactstrap";
function FormInput(props) {
    let validationState;
    let formControl;
    const {
        input,
        placeholder,
        label,
        type,
        addon,
        options,
        accept,
        min,
        value,
        meta: { touched, error, warning }
    } = props;

    if (/*touched &&*/ error) {
        validationState = "error";
    } else if (/*touched &&*/ !error) {
        validationState = null;
    } else if (/*touched &&*/ warning) {
        validationState = "warning";
    } else {
        validationState = null;
    }

    if (type === "textarea") {
        formControl = (
            <FormGroup
                componentClass="textarea"
                placeholder={placeholder}
                {...input}
            />
        );
    } else if (type === "file") {
        delete input.value;
        formControl = <FormGroup type={type} accept={accept} {...input} />;
    } else if (type === "select") {
        formControl = (
            <select className="custom-select" placeholder={placeholder} {...input}>
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    // disabled={option.value === 0 ? true : false}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        );
    } else if (addon) {
        formControl = (
            <InputGroup className="FormInput-addon">
                <InputGroup.Addon>{addon}</InputGroup.Addon>
                <FormGroup type={type} placeholder={placeholder} {...input} />
            </InputGroup>
        );
    } else {
        formControl = (
            <Input
                type={type}
                placeholder={placeholder}
                {...(touched ? { valid: error } : {})}
                {...input}
                min={min}
                value={value}
            />
        );
    }

    return (
        <FormGroup className={""} validationState={validationState}>
            {<p className="label">{label}</p>}
            {formControl}
            {touched &&
                ((error && <span className="errorText">{props.t(`${error}`)}</span>) ||
                    (warning && <span>{warning}</span>))}
            {error && <FormFeedback>{error}</FormFeedback>}
            {!error && warning && <FormText>{warning}</FormText>}
        </FormGroup>
    );
}

FormInput.propTypes = {
    t: PropTypes.func,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.any.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    help: PropTypes.string,
    addon: PropTypes.string,
    accept: PropTypes.string
};

FormInput.defaultProps = {
    placeholder: "",
    help: "",
    options: [],
    addon: null,
    accept: null
};

const mapStateToProps = () => {
    return {};
};

export default compose(
    translate,
    connect(mapStateToProps)
)(FormInput);
