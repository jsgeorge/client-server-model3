//import { SET_CURRENT_USER } from "../actions/types";
import { GET_EVENTS, GET_EVENT } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return action.payload;
    case GET_EVENT:
      // return { ...state, event: action.payload };
      return action.payload;
    default:
      return state;
  }
};
