import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { getEvents } from "../../actions/eventActions";
import { getSettings, chgDefaultCity } from "../../actions/settingsActions";
import { getCategories } from "../../actions/categoryActons";
import classnames from "classnames";

import EventItem from "./item";

class EventsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChgCity: false,
      srchStr: "",
      defaultCity: "",
      defaultState: "",
      city: "",
      state: "",
      errors: {},
      isLoading: false,
      invalid: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSaveDefaultCity = this.onSaveDefaultCity.bind(this);
  }

  componentDidMount() {
    this.props.getCategories();
    const uid = this.props.user.id;

    this.props.getSettings(uid);
    this.props.getEvents("", "", uid);
  }

  onShowChgCity(e) {
    this.setState({ errors: {}, isLoading: true });
    this.setState({ showChgCity: !this.state.showChgCity });
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

  isValidEntriesSrch() {
    let errors = {};
    const { srchStr } = this.state;
    if (!srchStr) {
      errors.srchStr = "Missing/invalid search term";
    }
    this.setState({ errors });

    const isValid = Object.keys(errors).length === 0;

    return isValid;
  }
  isValidEntriesCity() {
    let errors = {};
    const { defaultCity, defaultState } = this.state;

    if (!defaultCity) {
      errors.defaultCity = "Missing/invalid city";
    }
    if (!defaultState) {
      errors.defaultState = "Missing/invalid state";
    }
    this.setState({ errors });

    const isValid = Object.keys(errors).length === 0;

    return isValid;
  }
  clearState = () => {
    this.setState({ defaultCity: "", srchStr: "", error: {} });
  };
  onSearch = () => {
    if (this.isValidEntriesSrch()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.getEvents("", this.state.srchStr, this.props.user.id);
    }
  };
  onSaveDefaultCity = () => {
    if (this.isValidEntriesCity()) {
      this.setState({ errors: {}, isLoading: true });
      this.props
        .chgDefaultCity(
          {
            filterCity: this.state.defaultCity,
            filterState: this.state.defaultState
          },
          this.props.user.id
        )
        .then(
          res => {
            console.log("Change city successful");
            this.setState({ showChgCity: false });
            this.props.getSettings(this.props.user.id);
            this.props.getEvents("", this.props.user.id);
          },
          err => this.setState({ errors: err.response.data, isLoading: false })
        );
    } else {
      console.log("Invalid Entry");
    }
  };
  onFilterCategory = category => {
    this.props.getEvents(category, "", this.props.user.id);
  };
  render() {
    const { errors } = this.state;
    const { events, categories } = this.props;
    const { setting } = this.props.settings;
    return (
      <div className="events-wrapper">
        <div className="page-top-cmds">
          <div
            className={classnames("form-group", {
              "has-error": errors.srchStr
            })}
          >
            <input
              className="form-control form-control-sm mr-3 w-75"
              type="text"
              placeholder="Search events, venues, cities"
              name="srchStr"
              value={this.state.srchStr}
              onChange={this.onChange}
            />
            <button
              className="btn btn-default btn-sm"
              onClick={() => this.onSearch()}
            >
              <i className="fa fa-search" aria-hidden="true"></i>Q
            </button>

            {errors.srchStr && (
              <span className="help-block">{errors.srchStr}</span>
            )}
          </div>
        </div>
        <div className="page-top-cmds">
          {/* <input
            placeholder="filter by city"
            name="city"
            onChange={this.onChange}
          /> */}

          <div className="filterCmds">
            <h6>
              {setting ? (
                <span className="ctryFont">
                  {setting.filterCity}, {setting.filterState}
                </span>
              ) : (
                <span>No location set</span>
              )}
              <button
                style={{
                  height: "30px",
                  width: "30",
                  fontSize: "8px",
                  padding: "5px 2px",
                  fontWeight: "bold",
                  margin: "0 5px 0 0",
                  marginRignt: "60px",
                  background: "Transparent"
                }}
                className="btn btn-default"
                onClick={() => this.onShowChgCity()}
              >
                \/
              </button>
              {this.state.showChgCity ? (
                <div
                  className={classnames("form-group", {
                    "has-error": errors.defaultCity
                  })}
                >
                  <input
                    type="text"
                    name="defaultCity"
                    placeholder="change default city"
                    onChange={this.onChange}
                    value={this.state.defaultCity}
                  />
                  <input
                    type="text"
                    name="defaultState"
                    placeholder="change default State"
                    onChange={this.onChange}
                    value={this.state.defaultState}
                  />
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => this.onSaveDefaultCity()}
                  >
                    Submit
                  </button>
                  {errors.defaultCity && (
                    <span className="help-block">{errors.defaultCity}</span>
                  )}
                </div>
              ) : null}
              {categories.list ? (
                <span className="ctgryBtns">
                  <button
                    className="btn btn-default btn-sm ctgryBtn"
                    onClick={() => this.onFilterCategory("")}
                  >
                    All
                  </button>
                  {this.props.categories.list.map(c => (
                    <button
                      key={c._id}
                      className="btn btn-default btn-sm ctgryBtn"
                      onClick={() => this.onFilterCategory(c.name)}
                    >
                      {c.name}
                    </button>
                  ))}
                </span>
              ) : null}

              {/* <button
                  className="btn btn-default"
                  onClick={() => this.onChgDefaultCity()}
                >
                  Sports
                </button>
                <button
                  className="btn btn-default"
                  onClick={() => this.onChgDefaultCity()}
                >
                  Theater/Comedy
                </button> */}
            </h6>
          </div>
        </div>
        {/* <div className="page-top-cmds">
          <Link to="/events/new" className="btn btn-primary">
            Add Event
          </Link>
        </div> */}

        {events.list && events.list.length > 0 ? (
          <div>
            {this.props.events.list.map(event => (
              <EventItem key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p>No current events</p>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.auth.user,
    events: state.events,
    settings: state.settings,
    categories: state.categories
  };
}

export default connect(mapStateToProps, {
  getEvents,
  getSettings,
  getCategories,
  chgDefaultCity
})(withRouter(EventsPage));
