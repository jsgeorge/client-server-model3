import React from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "./common/TextFieldGroup";
//import validateInput from "../../server/shared/validations/login";
import { connect } from "react-redux";
import { login } from "../actions/authActions";

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      password: "",
      errors: {},
      isLoading: false,
      invalid: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValidEntries() {
    let errors = {};
    const { identifier, password } = this.state;
    if (!identifier) {
      errors.identifier = "Missing/invalid email";
    }
    if (!password) {
      errors.password = "Missing/invalid passworrd";
    }

    // if (errors) {
    this.setState({ errors });
    //   return false;
    // }
    // return true;
    const isValid = Object.keys(errors).length === 0;
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValidEntries()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        res => this.props.history.push("/events"),
        err =>
          this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group">
          <button className="btn btn-primary btn-lg" disabled={isLoading}>
            Login
          </button>
        </div>
      </form>
    );
  }
}

// LoginForm.propTypes = {
//   login: React.PropTypes.func.isRequired
// };

export default connect(null, { login })(withRouter(SigninForm));
