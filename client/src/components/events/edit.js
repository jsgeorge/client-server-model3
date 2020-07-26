import React from "react";
import EditEventForm from "./editForm";
import { Link, withRouter } from "react-router-dom";

class EditEventPage extends React.Component {
  render() {
    return (
      <div className="col-md-8">
        <div className="page-top-cmds">
          <Link to="/" className="back">
            {"<-"} Back
          </Link>
        </div>
        <h3>Edit Event</h3>
        <EditEventForm />
      </div>
    );
  }
}

export default EditEventPage;
