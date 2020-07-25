import React from "react";
import EditEventForm from "./editForm";

class EditEventPage extends React.Component {
  render() {
    return (
      <div className="col-md-8">
        <h3>Edit Event</h3>
        <EditEventForm />
      </div>
    );
  }
}

export default EditEventPage;
