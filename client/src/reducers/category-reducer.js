import { GET_CATEGORIES } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};
