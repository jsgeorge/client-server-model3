import React from "react";
import { Link } from "react-router-dom";
const EventItem = ({ event }) => {
  return (
    <div className="col-lg-3 col-md-4  col-sm-6">
      <div className="card desktop">
        <h6>
          <span className="event-date">{event.eventDate}</span>
        </h6>
        <Link to={`/events/${event._id}`}>
          <p
            style={{
              fontWeight: "normal",
              color: "#555",
              fontSize: "18px",
            }}
          >
            <strong>{event.name}</strong>
            <br />
            <span className="item-detail">
              {event.location} <br /> {event.city},{event.state}
            </span>
          </p>
        </Link>
      </div>
      <div className="card mobile">
        <Link to={`/events/${event._id}`}>
          <div className="date-mobile">
            <span className="event-date">{event.eventDate}</span>
          </div>
          <div ClassName="event-mobile">
            <p
              style={{
                fontWeight: "normal",
                color: "#555",
                fontSize: "18px",
              }}
            >
              <strong>{event.name}</strong>
              <br />
              <span className="item-detail">
                {event.location} <br /> {event.city},{event.state}
              </span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
