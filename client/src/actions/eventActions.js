import axios from "axios";
import { GET_EVENTS, GET_EVENT } from "./types";

// export const getEvents = () => async dispatch => {
//   const request = await axios.get(`/api/events`);
//   dispatch({ type: GET_EVENTS, payload: request.data });
// };
// export const getEvents = city => async dispatch => {
//   const request = await axios.get(`/api/events/byCity?city=${city}`);
//   dispatch({ type: GET_EVENTS, payload: request.data });
// };
export const getEvents = (category, srchStr, uid) => async dispatch => {
  const request = await axios.get(
    `/api/events?uid=${uid}&category=${category}&srchStr=${srchStr}`
  );
  dispatch({ type: GET_EVENTS, payload: request.data });
};
export const getEvent = id => async dispatch => {
  const request = await axios.get(`/api/events/id?id=${id}`);
  dispatch({ type: GET_EVENT, payload: request.data });
};

export function addEvent(eventData) {
  return dispatch => {
    return axios.post("/api/events", eventData);
  };
}

export function updateEvent(eventData, id) {
  return dispatch => {
    return axios.post(`/api/events/update?id=${id}`, eventData);
  };
}
