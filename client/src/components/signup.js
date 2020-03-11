import React from "react";
import SignupForm from "./signup-form";
import { connect } from "react-redux";
import { userSignupRequest } from "../actions/authActions";
// import { addFlashMessage } from "../../actions/flashMessages.js";

class SignupPage extends React.Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm
            //isUserExists={isUserExists}
            userSignupRequest={userSignupRequest}
            //addFlashMessage={addFlashMessage}
          />
        </div>
      </div>
    );
  }
}

//SignupPage.propTypes = {
//  userSignupRequest: React.PropTypes.func.isRequired //,
//   addFlashMessage: React.PropTypes.func.isRequired,
//   isUserExists: React.PropTypes.func.isRequired
//};

export default connect(null, {
  userSignupRequest //,
  // addFlashMessage,
  // isUserExists
})(SignupPage);
//export default SignupPage;
