import React from "react";
import AddEventForm from "./addForm";

class AddEventPage extends React.Component {
  render() {
    return (
      <div className="col-md-8">
        <h3>Add Event</h3>
        <AddEventForm />
      </div>
    );
  }
}

export default AddEventPage;
