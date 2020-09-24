import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import LOGO from "../../assets/img/svg/logo.svg";
import pagesRoutes from "../../routes/pages.jsx";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import { userLogout } from "../../actions/loginAction";
import { showSuccess } from "../../helpers";
import IdleTimer from "react-idle-timer";
import { showError } from "helpers";
class PagesHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.activeRoute.bind(this);
    this.idleTimer = null;
  }

  componentDidMount = () => {
    localStorage.setItem("lang", "fr-FR");
  };
  // componentDidMount = () => {
  //   if (localStorage.getItem("lang")) {
  //     localStorage.setItem("lang", localStorage.getItem("lang"));
  //     if (localStorage.getItem("langName"))
  //       document.getElementById("activeLang").innerHTML = localStorage.getItem(
  //         "langName"
  //       );
  //   } else {
  //     localStorage.setItem("lang", "fr-FR");
  //     // document.getElementById("activeLang").innerHTML = "Français - fr";
  //   }
  // };
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  // Profile dropdown
  dropdownToggleProfile = () => {
    this.setState({
      ProfileDropdownOpen: !this.state.ProfileDropdownOpen,
    });
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  onActive = () => {
    // console.log('time remaining', this.idleTimer.getRemainingTime())
  };
  onAction = () => { };
  onIdle = (e) => {
    showError(this.props.t("Header.SESSION_TIMEOUT"));
    const userProfileData = JSON.parse(
      localStorage.getItem("foGRCUserProfileData")
    );
    if (userProfileData) {
      this.logout(false);
    }
  }
  logout = (showMessage = true) => {
    const userProfileData = JSON.parse(
      localStorage.getItem("foGRCUserProfileData")
    );
    const reqestData = {
      code: userProfileData.data.code,
      email: userProfileData.data.email,
    };
    console.log("test");
    this.props.dispatch(userLogout(reqestData));
    if (showMessage) {
      showSuccess(this.props.t("SuccessMsg.LOGOUT_MSG"));
    }
    // removing local storage data
    localStorage.removeItem("foGRCUserProfileData");
    localStorage.removeItem("foGRCAuthToken");
    this.props.history.push("/pages/login");
    window.location.reload();
  };
  render() {
    const userProfileData = JSON.parse(
      localStorage.getItem("foGRCUserProfileData")
    );
    return (
      <Navbar
        expand="xl"
        className={
          this.state.isOpen
            ? "bg-white navbar-absolute"
            : "navbar-transparent navbar-absolute"
        }
      >
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          element={document}
          // onActive={this.onActive}
          onIdle={(e) => { this.onIdle(e) }}
          // onAction={this.onAction}
          debounce={250}
          timeout={process.env.REACT_APP_FO_TIMEOUT}
        />
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <NavbarToggler onClick={this.toggle}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            {!localStorage.getItem("foGRCAuthToken") ? (
              <Link to="/" className="navbar-brand">
                <img src={LOGO} alt="ONCF" width="75%" />
              </Link>
            ) : (
                <Link to="/pages/research-claim" className="navbar-brand">
                  <img src={LOGO} alt="ONCF" width="75%" />
                </Link>
              )}
          </div>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* <NavItem>
                <Link to="/dashboard" className="nav-link">
                  <i className="now-ui-icons design_bullet-list-67" /> Dashboard
                </Link>
              </NavItem> */}
              {pagesRoutes.map((prop, key) => {
                if (prop.redirect) return null;
                // if (prop.hide) return null;
                // hiding login when user logged in
                if (
                  localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "Login"
                ) {
                  return;
                } else if (
                  !localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "Login"
                ) {
                  return;
                }
                // hiding initiate claim
                if (
                  !localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "initiate-claim"
                ) {
                  return;
                }
                // hiding research
                if (
                  !localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "research-claim"
                ) {
                  return;
                }
                // Hiding forgot password
                if (
                  localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "forgot-password"
                ) {
                  return;
                } else if (
                  !localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "forgot-password"
                ) {
                  return;
                }
                // Hiding change password
                if (
                  localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "change-password"
                ) {
                  return;
                } else if (
                  !localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "change-password"
                ) {
                  return;
                }
                // View claims
                if (
                  localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "view-claim-details"
                ) {
                  return;
                } else if (
                  !localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "view-claim-details"
                ) {
                  return;
                }
                // update claims
                if (
                  localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "update-claim"
                ) {
                  return;
                } else if (
                  !localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "update-claim"
                ) {
                  return;
                }
                // Details of claim
                if (
                  localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "claim-details"
                ) {
                  return;
                } else if (
                  !localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "claim-details"
                ) {
                  return;
                }
                // error page
                if (
                  localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "error-page"
                ) {
                  return;
                } else if (
                  !localStorage.getItem("foGRCAuthToken") &&
                  prop.name === "error-page"
                ) {
                  return;
                }
                return (
                  <NavItem key={key} className={this.activeRoute(prop.path)}>
                    <Link to={prop.path} className="nav-link">
                      {/* <i className={"now-ui-icons " + prop.icon} /> */}
                      {prop.short}
                    </Link>
                  </NavItem>
                );
              })}

              {localStorage.getItem("foGRCAuthToken") && (
                <Dropdown
                  nav
                  isOpen={this.state.ProfileDropdownOpen}
                  toggle={() => this.dropdownToggleProfile()}
                >
                  <DropdownToggle caret nav>
                    {/* <i className="now-ui-icons users_circle-08" /> */}
                    <p>
                      <span className="d-lg d-md-block">
                        {userProfileData && userProfileData.data
                          ? userProfileData.data.firstName
                          : "Profile"}
                      </span>
                    </p>
                  </DropdownToggle>
                  <DropdownMenu right className="text-dark">
                    <DropdownItem
                      onClick={() =>
                        this.props.history.push("/pages/change-password")
                      }
                    >
                      {this.props.t("Header.CHANGE_PASSWORD")}
                    </DropdownItem>
                    <DropdownItem onClick={() => this.logout()}>
                      {this.props.t("Header.LOGOUT")}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logoutSuccess: state.login.logoutSuccess,
    logoutError: state.login.logoutError,
  };
};
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(PagesHeader);
