import axios from "axios";
import { GET_CATEGORIES} from "./types";

export const getCategories = () => async dispatch => {
  const request = await axios.get("/api/categories");
  dispatch({ type: GET_CATEGORIES, payload: request.data });
};
// export const getEvent = id => async dispatch => {
//   const request = await axios.get(`/api/events/id?id=${id}`);
//   dispatch({ type: GET_EVENT, payload: request.data });
// };
// export function addEvent(eventData) {
//   return dispatch => {
//     return axios.post("/api/events", eventData);
//   };
// }

// export function updateEvent(eventData, id) {
//   return dispatch => {
//     return axios.post(`/api/events/update?id=${id}`, eventData);
//   };
// }
