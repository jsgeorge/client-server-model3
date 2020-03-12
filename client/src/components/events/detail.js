import React, { Component } from "react";
import { connect } from "react-redux";
import { getEvent } from "../../actions/eventActions";
import { Link } from "react-router-dom";

class EventDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getEvent(id);
  }
  deleteEvent = id => {
    console.log("event id to delete", id);
  };
  render() {
    const { event } = this.props.events;

    if (!event) return <div>NO Matching event</div>;
    return (
      <div>
        <div>
          <h5>{event.name}</h5>
          <strong>
            {event.eventDate} {event.eventTime}
          </strong>
          <p>
            {event.location} <br />
            {event.address} <br /> {event.city},{event.state}
          </p>
          <p>{event.description}</p>
          <p>Category: {event.category}</p>
          {event.username === this.props.user.username ? (
            <div>
              <Link
                to={`/events/edit/${event._id}`}
                className="btn btn-primary"
              >
                Edit
              </Link>
              <button
                onClick={this.deleteEvent(event._id)}
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
  return {
    auth: state.auth,
    user: state.auth.user,
    events: state.events //,
    //event: state.events.find(item => item._id === ownProps.match.params.id)
  };
}
export default connect(mapStateToProps, { getEvent })(EventDetail);
