//import { SET_CURRENT_USER } from "../actions/types";
import { GET_EVENTS, GET_EVENT } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, list: action.payload };
    case GET_EVENT:
      return { ...state, event: action.payload };
    default:
      return state;
  }
};
