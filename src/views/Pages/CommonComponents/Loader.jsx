import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import LoaderImg from "../../../assets/img/loader.gif";

class LoaderComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        {this.props.loading && (
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Row>
              <div className="w-100 loader-s d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <img src={LoaderImg} alt="loader" />
                </div>
              </div>
            </Row>
          </ReactCSSTransitionGroup>
        )}
      </Fragment>
    );
  }
}
export default compose(translate, withRouter, connect())(LoaderComponent);
