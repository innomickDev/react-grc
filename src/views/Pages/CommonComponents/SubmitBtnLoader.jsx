import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Button from "reactstrap-button-loader";

export default function SubmitBtnLoader(props) {
    // console.log(props.submitting);
    return (
        <Button
            type={props.type}
            className={classnames(props.className)}
            disabled={props.submitting}
            onClick={props.onClick}
            bsStyle={props.bsStyle}
            loading={props.loading}
            color={props.color}
        >
            {props.label}
        </Button>
    );
}

SubmitBtnLoader.propTypes = {
    submitting: PropTypes.bool.isRequired,
    className: PropTypes.any,
    label: PropTypes.string,
    type: PropTypes.string,
    bsStyle: PropTypes.string,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    color: PropTypes.bool
};

SubmitBtnLoader.defaultProps = {
    className: "SubmitBtnLoader",
    label: "Submit",
    type: "button",
    bsStyle: "default",
    onClick: null
};
