import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
//import SelectFieldGroup from "../common/SelectFieldGroup";
import classnames from "classnames";

import { connect } from "react-redux";
import { addEvent } from "../../actions/eventActions";
import { getCategories } from "../../actions/categoryActons";

class AddEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      eventDate: "",
      eventTime: "",
      city: "",
      state: "",
      location: "",
      address: "",
      description: "",
      errors: {},
      isLoading: false,
      invalid: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    //this.setState({ username: this.props.user.username });
    this.props.getCategories();
  }
  onChange(e) {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({ [e.target.name]: e.target.value, errors });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  valid(value) {
    console.log(/[^0-9a-zA-Z]/.test(value));
    return /[^0-9a-zA-Z]/.test(value);
  }
  isValidEntries() {
    let errors = {};
    const {
      name,
      category,
      location,
      eventDate,
      eventTime,
      address,
      city,
      state,
    } = this.state;
    if (!name) {
      errors.name = "Missing/invalid name";
    }
    if (!category) {
      errors.category = "Missing/invalid category";
    }
    if (!location) {
      errors.location = "missing/invalid location";
    }
    if (!eventDate) {
      errors.eventDate = "missing/invalid event date";
    }
    if (!eventTime) {
      errors.eventTime = "missing/invalid event time";
    }
    if (!address) {
      errors.address = "missing/invalid address";
    }
    if (!city) {
      errors.city = "missing/invalid event date";
    }
    if (!state) {
      errors.state = "missing/invalid event time";
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
    //if (this.isValidEntries()) {
    this.setState({ errors: {}, isLoading: true });
    this.props.addEvent(this.state).then(
      (res) => this.props.history.push("/events"),
      (err) =>
        this.setState({ errors: err.response.data.errors, isLoading: false })
    );
    //}
  }
  showCategoryButtons = (name) => (
    <span>
      <label className="custom-control-label" for="defaultUnchecked">
        {name}
      </label>
      <input
        type="radio"
        className="custom-control-input"
        id="defaultUnchecked"
        name="defaultExampleRadios"
      />
    </span>
  );
  render() {
    const { errors } = this.state;
    const { categories } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {errors.form && (
            <div className="alert alert-danger">{errors.form}</div>
          )}
          {categories.list ? (
            <div
              className={classnames("form-group", { "has-error": errors.name })}
            >
              <select
                className="form-control"
                onChange={this.onChange}
                //checkUserExists={this.checkUserExists}
                value={this.state.category}
                name="category"
              >
                <option value="">Event category</option>
                {this.props.categories.list.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="help-block">{errors.category}</span>
              )}
            </div>
          ) : (
            <p>No current categories</p>
          )}

          {/* {categories.list ? (
            <div>
              <label>Category</label>
              <div
                style={{
                  background: "#eee",
                  padding: "5px",
                  marginBottom: "10px",
                  maxWidth: "200px"
                }}
              >
                {this.props.categories.list.map(c => (
                  <div
                    key={c._id}
                    className="form-check"
                    style={{
                      paddingLeft: "0px",
                      marginBottom: "10px"
                    }}
                  >
                    <label
                      className="form-check-label "
                      style={{
                        marginLeft: "0px",
                        width: "150px",
                        marginRight: "25px"
                      }}
                    >
                      {c.name}
                    </label>

                    <input
                      type="radio"
                      className="form-check-input pull-right"
                      name="category"
                      value={c.name}
                      onChange={this.onChange}
                    />
                  </div>
                ))}
              </div>
              {errors.name && <span className="help-block">{errors.name}</span>}
            </div>
          ) : (
            <p>No current category</p>
          )} */}
          <TextFieldGroup
            error={errors.name}
            label="Event Name"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.name}
            field="name"
          />
          <TextFieldGroup
            error={errors.eventDate}
            label="eventDate"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.eventDate}
            field="eventDate"
          />
          <TextFieldGroup
            error={errors.eventTime}
            label="eventTime"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.eventTime}
            field="eventTime"
          />
          <TextFieldGroup
            error={errors.location}
            label="location"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.location}
            field="location"
          />
          <TextFieldGroup
            error={errors.address}
            label="address"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.address}
            field="address"
          />
          <TextFieldGroup
            error={errors.city}
            label="city"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.city}
            field="city"
          />
          <TextFieldGroup
            error={errors.state}
            label="State"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.state}
            field="state"
          />
          <TextFieldGroup
            error={errors.description}
            label="description"
            onChange={this.onChange}
            //checkUserExists={this.checkUserExists}
            value={this.state.description}
            field="description"
          />
          <div className="form-group">
            <button
              disabled={this.state.isLoading || this.state.invalid}
              className="btn btn-danger btn-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.auth.user,
    categories: state.categories,
  };
}
export default connect(mapStateToProps, { addEvent, getCategories })(
  withRouter(AddEventForm)
);
