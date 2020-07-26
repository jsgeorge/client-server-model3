import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getEvents } from "../../actions/eventActions";
import { chgDefaultCity } from "../../actions/settingsActions";
import { getCategories } from "../../actions/categoryActons";
import { getSettings } from "../../actions/settingsActions";
import classnames from "classnames";
import EventItem from "./item";

class EventsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChgCity: false,
      srchStr: "",
      category: "All Categories",
      defaultCity: "",
      defaultState: "",
      errors: {},
      isLoading: false,
      invalid: false,
      showMenu: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSaveDefaultCity = this.onSaveDefaultCity.bind(this);
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getSettings();
    this.props.getEvents({});
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
    this.setState({ category: "", srchStr: "", error: {} });
  };
  onSearch = () => {
    if (this.isValidEntriesSrch()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.getEvents({
        srchStr: this.state.srchStr,
      });
    }
  };
  onShowChgCity = () => {
    this.setState({ showChgCity: !this.state.showChgCity });
  };
  onSaveDefaultCity = () => {
    if (this.isValidEntriesCity()) {
      const { defaultCity, defaultState } = this.state;
      this.setState({ errors: {}, isLoading: true });
      this.props
        .chgDefaultCity({
          defaultCity: defaultCity,
          defaultState: defaultState,
        })
        .then(
          (res) => {
            console.log("Change city successful");
            this.setState({ showChgCity: false });
            this.props.getSettings();
            this.props.getEvents({});
          },
          (err) =>
            this.setState({ errors: err.response.data, isLoading: false })
        );
    } else {
      console.log("Invalid Entry");
    }
  };
  onFilterCategory = (name) => {
    this.setState({ category: name, showMenu: false });
    this.props.getEvents({
      category: name,
    });
  };
  onClearFilters = () => {
    this.setState({ srchStr: "" });
    this.props.getEvents({});
  };
  onShowMobileCtgries = () => {
    this.setState({ showMenu: true });
  };
  onHideMobileCtgries = () => {
    this.setState({ showMenu: false });
  };
  render() {
    const { errors } = this.state;
    const { events, categories, settings } = this.props;
    //const { defaultCity, defaultState } = this.props.settings.setting;
    return (
      <div className="events-wrapper">
        <div className="page-top-cmds">
          <div
            className={classnames("", {
              "has-error": errors.srchStr,
            })}
          >
            <input
              type="text"
              className="searchBar"
              placeholder="Search events, venues, cities"
              name="srchStr"
              value={this.state.srchStr}
              onChange={this.onChange}
            />
            <button
              className="btn-transparent btnSearch"
              onClick={() => this.onSearch()}
            >
              <i className="fa fa-search"></i>
            </button>
            {/* <button
              className="btn-transparent btnClear"
              onClick={() => this.onClearFilters()}
            >
              <i className="fa fa-close"></i>
            </button> */}
            {errors.srchStr && (
              <span className="help-block">{errors.srchStr}</span>
            )}
          </div>
        </div>
        <div className="page-top-cmds">
          <div className="filterCmd">
            {settings && settings.setting && settings.setting.defaultCity ? (
              <span className="ctryFont">
                {settings.setting.defaultCity}, {settings.setting.defaultState}
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
                background: "Transparent",
              }}
              className="btn btn-default"
              onClick={() => this.onShowChgCity()}
            >
              \/
            </button>
            {this.state.showChgCity ? (
              <div>
                {errors.form && (
                  <div className="alert alert-danger">
                    {this.state.errors.form}
                  </div>
                )}
                <div
                  className={classnames("form-group", {
                    "has-error": errors.defaultCity,
                  })}
                >
                  <input
                    type="text"
                    className="chgCityBar"
                    name="defaultCity"
                    placeholder=" City"
                    onChange={this.onChange}
                    value={this.state.defaultCity}
                  />
                  <input
                    type="text"
                    className="chgStateBar"
                    name="defaultState"
                    placeholder="State"
                    onChange={this.onChange}
                    value={this.state.defaultState}
                  />
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.onSaveDefaultCity()}
                  >
                    Submit
                  </button>
                  {errors.defaultCity && (
                    <span className="help-block">{errors.defaultCity}</span>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <span className="filterCmd ctryFont mobile">
            {this.state.category ? this.state.category : "All Categories"}
            <button
              style={{
                height: "30px",
                width: "30",
                fontSize: "8px",
                padding: "5px 2px",
                fontWeight: "bold",
                margin: "0 5px 0 0",
                marginRignt: "60px",
                background: "Transparent",
              }}
              className="btn btn-default"
              onClick={() => this.onShowMobileCtgries()}
            >
              \/
            </button>
          </span>

          {categories.list ? (
            <span
              className="ctgryBtns desktop"
              onClick={() => this.onHideMobileCtgries()}
            >
              <button
                className="btn btn-default btn-sm ctgryBtn"
                onClick={() => this.onFilterCategory()}
              >
                All Categories
              </button>
              {this.props.categories.list.map((c) => (
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
          {categories.list && this.state.showMenu ? (
            <div className="mobile-modal mobile">
              <span className="ctgryMenu mobile ">
                <h3>
                  Categories{" "}
                  <button
                    class="btn-mobile-close"
                    onClick={() => this.onHideMobileCtgries()}
                  >
                    close
                  </button>
                </h3>
                <button
                  className="btn btn-default btn-sm ctgryBtn ctgryFont"
                  onClick={() => this.onFilterCategory()}
                >
                  All Categories
                </button>
                {this.props.categories.list.map((c) => (
                  <button
                    key={c._id}
                    className="btn btn-default btn-sm ctgryBtn ctgryFont"
                    onClick={() => this.onFilterCategory(c.name)}
                  >
                    {c.name}
                  </button>
                ))}
              </span>
            </div>
          ) : null}
        </div>

        {this.state.category ? (
          <h4 className="desktop">{this.state.category}</h4>
        ) : null}

        {events && events.length > 0 ? (
          <div className="event-wrapper">
            <div className="row">
              {this.props.events.map((event) => (
                <EventItem key={event._id} event={event} />
              ))}
            </div>
          </div>
        ) : (
          <div className="event-wrapper">
            <p>No current events</p>
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return {
    auth: state.auth,
    user: state.auth.user,
    events: state.events,
    categories: state.categories,
    settings: state.settings,
  };
}

export default connect(mapStateToProps, {
  getEvents,
  getCategories,
  getSettings,
  chgDefaultCity,
})(withRouter(EventsPage));
