import React from "react";
import { withRouter } from "react-router-dom";
import timezones from "../data/timezones";
import map from "lodash/map";
import classnames from "classnames";
//import validateInput from "../../../server/shared/validations/signup";
import TextFieldGroup from "./common/TextFieldGroup";
//import PropTypes from "prop-types";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      identifier: "",
      password: "",
      passwordConfirmation: "",
      timezone: "",
      defaultCity: "",
      defaultState: "",
      errors: {},
      isLoading: false,
      invalid: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValidEntries() {
    let errors = {};
    const {
      identifier,
      password,
      passwordConfirmation,
      username,
      timezone,
      defaultState,
      defaultCity
    } = this.state;
    if (!identifier) {
      errors.identifier = "Missing/invalid email";
    }
    if (!password) {
      errors.password = "Missing/invalid passworrd";
    }
    if (!passwordConfirmation) {
      errors.passwordConfirmation = "Missing/invalid passworrd confirm";
    }
    if (password != passwordConfirmation) {
      errors.passwordConfirmation = "Passwords don't match";
    }
    if (!username) {
      errors.username = "Missing/invalid username";
    }
    if (!timezone) {
      errors.timezone = "Time zone not selected";
    }
    if (!defaultCity) {
      errors.defaultCity = "Missing/invalid defaultCity";
    }
    if (!defaultState) {
      errors.defaultState = "Missing/invalid defaultState";
    }
    // if (errors) {
    this.setState({ errors });
    //   return false;
    // }
    // return true;
    const isValid = Object.keys(errors).length === 0;
    return isValid;
  }
  //   checkUserExists(e) {
  //     const field = e.target.name;
  //     const val = e.target.value;
  //     if (val !== "") {
  //       this.props.isUserExists(val).then(res => {
  //         let errors = this.state.errors;
  //         let invalid;
  //         if (res.data.user) {
  //           errors[field] = "There is user with such " + field;
  //           invalid = true;
  //         } else {
  //           errors[field] = "";
  //           invalid = false;
  //         }
  //         this.setState({ errors, invalid });
  //       });
  //     }
  //   }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValidEntries()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        res => this.props.history.push("/events"),
        err => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  render() {
    const {
      errors,
      identifier,
      password,
      passwordConfirmation,
      username,
      timezone,
      defaultCity,
      defaultState,
      isLoading
    } = this.state;
    const options = map(timezones, (val, key) => (
      <option key={val} value={val}>
        {key}
      </option>
    ));
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>
        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <TextFieldGroup
          field="identifier"
          label=" Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />
        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          //checkUserExists={this.checkUserExists}
          value={username}
          field="username"
        />
        <div
          className={classnames("form-group", { "has-error": errors.timezone })}
        >
          <select
            className="form-control"
            name="timezone"
            onChange={this.onChange}
            value={timezone}
          >
            <option value="" disabled>
              Choose Your Timezone
            </option>
            {options}
          </select>
          {errors.timezone && (
            <span className="help-block">{errors.timezone}</span>
          )}
        </div>
        <TextFieldGroup
          error={errors.defaultCity}
          label="Your City"
          onChange={this.onChange}
          //checkUserExists={this.checkUserExists}
          value={defaultCity}
          field="defaultCity"
        />
        <TextFieldGroup
          error={errors.defaultState}
          label="Your State"
          onChange={this.onChange}
          //checkUserExists={this.checkUserExists}
          value={defaultState}
          field="defaultState"
        />
        <div className="form-group">
          <button
            disabled={this.state.isLoading || this.state.invalid}
            className="btn btn-primary btn-lg"
          >
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

//SignupForm.propTypes = {
// userSignupRequest: React.PropTypes.func.isRequired
//addFlashMessage: React.PropTypes.func.isRequired,
//isUserExists: React.PropTypes.func.isRequired
//};

// SignupForm.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };

export default withRouter(SignupForm);
