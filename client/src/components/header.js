import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

class Header extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        {/*Navbar*/}
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
          <div className="container">
            {/* Navbar brand */}
            {!isAuthenticated ? (
              <Link className="navbar-brand" to="/">
                MongoEvents
              </Link>
            ) : (
              <Link className="navbar-brand" to="/events">
                MongoEvents
              </Link>
            )}
            {/* Collapse button */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#basicExampleNav"
              aria-controls="basicExampleNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Collapsible content */}
            <div className="collapse navbar-collapse" id="basicExampleNav">
              {/* Links */}
              {!isAuthenticated ? (
                <ul className="navbar-nav mr-auto ">
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Register
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav mr-auto ">
                  <li className="nav-item">
                    <Link to="/events/new" className="nav-link ">
                      <i className="fa fa-plus fa-lg"></i> Add Event
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/account">
                      <i
                        className="fa fa-user-circle fa-lg"
                        style={{ color: "#fff" }}
                      ></i>{" "}
                      Account
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="navBtn" onClick={this.logout.bind(this)}>
                      Sign Out
                    </button>
                  </li>
                </ul>
              )}
              {/* Links */}
            </div>
            {/* Collapsible content */}
          </div>
        </nav>
        {/*Navbar*/}

        {/* <nav className="navbar navbar-expand-lg navbar-light bg-danger ">
          <div className="container header">
            {!isAuthenticated ? (
              <Link
                to="/"
                className="navbar-brand"
                style={{
                  color: "#fff"
                }}
              >
                MongoEvents
              </Link>
            ) : (
              <span>
                <Link
                  to="/events"
                  className="navbar-brand"
                  style={{
                    color: "#fff"
                  }}
                >
                  MongoEvents
                </Link>
                <Link
                  to="/events/new"
                  style={{
                    background: "#fff",
                    borderRadius: "200px",
                    border: "1px solid #eee",
                    color: "#777",
                    height: "40px",
                    width: "40px",
                    fontWeight: "bold",
                    padding: "0 4px",
                    margin: "0",
                    marginLeft: "20px"
                  }}
                >
                  <i className="fa fa-plus"></i>
                </Link>
              </span>
            )}

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{
                color: "#fff"
              }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              {" "}
              {!isAuthenticated ? (
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/signin">Sign In</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </ul>
              ) : (
                <ul className="nav navbar-nav navbar-right">
                  <li className="nav-item">
                    <Link to="/account" className="nav-link ">
                      <i
                        className="fa fa-user-circle fa-lg"
                        style={{ color: "#fff" }}
                      ></i>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <a
                      href="/"
                      onClick={this.logout.bind(this)}
                      className="nav-link "
                      style={{
                        color: "#fff"
                      }}
                    >
                      Sign Out
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav> */}
      </div>
    );
  }
}

// Header.propTypes = {
//   auth: React.PropTypes.object.isRequired,
//   logout: React.PropTypes.func.isRequired
// };

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps, { logout })(Header);
