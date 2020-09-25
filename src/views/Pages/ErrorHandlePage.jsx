import React from "react";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import bgImage from "assets/img/plain-white.jpg";
import { reduxForm } from "redux-form";
class ErrorHandlePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    render() {
        return (
            <div>
                <div className="full-page-content">
                    <div id="notfound">
                        <div class="notfound">
                            <div class="notfound-404">
                                <h1>404</h1>
                            </div>
                            <h2>{this.props.t("ErrorMsg.SOMETHING_WENT_WRONG")}</h2>
                            <p>{this.props.t("ErrorMsg.MESSAGE")} <a href="javascript:void(0)" onClick={() =>
                                this.props.history.push("/pages/login")
                            }>{this.props.t("ErrorMsg.RETURN_TO_LOGIN_PAGE")}</a></p>

                        </div>
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
ErrorHandlePage = reduxForm({
    form: "ErrorHandlePage",
})(ErrorHandlePage);

export default compose(translate)(ErrorHandlePage);
