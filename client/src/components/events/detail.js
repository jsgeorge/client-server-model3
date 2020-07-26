import React, { Component } from "react";
import { connect } from "react-redux";
import { getEvent, deleteEvent } from "../../actions/eventActions";
import { Link } from "react-router-dom";
import { googleAPIKey } from "../../utils/configure";
import Iframe from "react-iframe";

class EventDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getEvent(id);
  }
  deleteEvent = (id) => {
    console.log("event id to delete", id);
    this.props.deleteEvent(id);
    this.props.history.push("/events");
  };

  render() {
    //const { event } = this.props.events;

    const id = this.props.match.params.id;
    const {
      name,
      category,
      username,
      eventDate,
      eventTime,
      location,
      address,
      city,
      state,
      description,
      ticketsFrom,
      ticketsTo,
    } = this.props.event;

    if (!this.props.event)
      return <div className="events-wrapper"> NO Matching event</div>;

    return (
      <div className="events-wrapper">
        <div className="page-top-cmds">
          <Link to="/" className="back">
            {"<-"} Back
          </Link>
        </div>
        <div>
          <h5>{name}</h5>
          <strong>When: </strong> {eventDate} {eventTime} <br />
          <p>
            <strong>Where: </strong> {location} <br />
            {address} <br /> {city},{state}
          </p>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>About:</strong> {description}
          </p>
          <p>
            <strong>Tickets</strong>{" "}
            {ticketsFrom ? <span>from ${ticketsFrom}</span> : null}{" "}
            {ticketsTo ? <span>to ${ticketsTo}</span> : null}
          </p>
          <div>
            <Iframe
              width="300"
              height="300"
              frameborder="0"
              style="border:0"
              src={`https://www.google.com/maps/embed/v1/place?key=${googleAPIKey}&q=${location},${city} allowfullscreen`}
            ></Iframe>
          </div>
          {username === this.props.user.username ? (
            <div>
              <Link to={`/events/edit/${id}`} className="btn btn-danger btn-sm">
                Edit
              </Link>
              <button
                onClick={() => this.deleteEvent(id)}
                className="btn btn-default btnDefault btn sm"
              >
                Delete
              </button>
            </div>
          ) : null}
          ``
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  if (ownProps.match.params.id)
    return {
      auth: state.auth,
      user: state.auth.user,
      events: state.events,
      event: state.event,
      //event: state.events.find(item => item._id === ownProps.match.params.id)
    };
}
export default connect(mapStateToProps, { getEvent, deleteEvent })(EventDetail);
