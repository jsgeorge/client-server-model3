import React, { Component } from "react";
import { connect } from "react-redux";
import { getEvent, deleteEvent } from "../../actions/eventActions";
import { Link } from "react-router-dom";

class EventDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getEvent(id);
  }
  deleteEvent = id => {
    console.log("event id to delete", id);
    this.props.deleteEvent(id);
    this.props.history.push("/events");
  };
  render() {
    //const { event } = this.props.events;

    if (!this.props.event) return <div>NO Matching event</div>;
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
      description
    } = this.props.event;

    return (
      <div>
        <div>
          <h5>{name}</h5>
          <strong>
            {eventDate} {eventTime}
          </strong>
          <p>
            {location} <br />
            {address} <br /> {city},{state}
          </p>
          <p>{description}</p>
          <p>Category: {category}</p>
          {username === this.props.user.username ? (
            <div>
              <Link to={`/events/edit/${id}`} className="btn btn-primary">
                Edit
              </Link>
              <button
                onClick={() => this.deleteEvent(id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ) : null}
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
      event: state.event
      //event: state.events.find(item => item._id === ownProps.match.params.id)
    };
}
export default connect(mapStateToProps, { getEvent, deleteEvent })(EventDetail);
