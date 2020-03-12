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
      <nav className="navbar navbar-expand-lg navbar-light bg-danger fixed-top">
        <div className="container-fluid">
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
                <span style={{ fontSize: "24px" }}>+</span>
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
            <ul className="navbar-nav navbar-right">
              {!isAuthenticated ? (
                <span>
                  <li className="nav-item">
                    <Link to="/signin" className="nav-link">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link ">
                      Sign Up
                    </Link>
                  </li>
                </span>
              ) : (
                <span>
                  {/* <li className="nav-item">
                    <Link to="/account" className="nav-link ">
                      Account
                    </Link>
                  </li> */}

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
                </span>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

// Header.propTypes = {
//   auth: React.PropTypes.object.isRequired,
//   logout: React.PropTypes.func.isRequired
// };

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps, { logout })(Header);
