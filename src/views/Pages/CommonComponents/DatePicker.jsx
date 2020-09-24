import React, { Fragment } from "react";
import { InputGroup, InputGroupAddon } from "reactstrap";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker, { registerLocale } from "react-datepicker";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import moment from "moment";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);
// import moment from "moment";
// import "moment/locale/ar-ma"; // without this line it won't work
// import "moment/locale/fr";
moment.locale("ar-ma");
// const yesterday = moment(new Date()).subtract(1, "day");

// registerLocale("en", en);
class DatePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
    this.props.getselectedData(date);
  }
  calanderLang = (langCode) => {
    switch (langCode) {
      case "en-US":
        return "en";
      case "fr-FR":
        return "fr";
      case "ar-MA":
        return "ar-ma";
      default:
        return "en";
    }
  };
  render() {
    // console.log(this.calanderLang(localStorage.getItem("lang")));
    return (
      <Fragment>
        <InputGroup>
          <DatePicker
            {...this.props.input}
            selected={this.state.startDate}
            onChange={this.handleChange}
            // showTimeSelect

            locale={this.calanderLang(localStorage.getItem("lang"))}
            showTimeInput
            className="form-control"
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption={this.props.t("Common.TIME")}
            dateFormat="MMMM d, yyyy h:mm aa"
            // maxDate={new Date(yesterday)}
            id="datePickerInput"
            // excludeTimes={[new Date().getHours()]}
          />
          <InputGroupAddon
            className="dummy-cursor"
            addonType="append"
            onClick={() => document.getElementById("datePickerInput").click()}
          >
            <div className="input-group-text">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
          </InputGroupAddon>
        </InputGroup>
      </Fragment>
    );
  }
}

export default compose(translate)(DatePickerComponent);
