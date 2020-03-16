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
export const getEvents = filters => async dispatch => {
  let request;
  let filterString;

  if (filters.category && filters.city)
    filterString = `city=${filters.city}&state=${filters.state}&category=${filters.category}`;
  else if (filters.category) filterString = `category=${filters.category}`;
  else if (filters.srchStr && filters.city)
    filterString = `${filters.city}&state=${filters.state}&srchStr=${filters.srchStr}`;
  else if (filters.srchStr) filterString = `category=${filters.srchStr}`;
  else if (filters.city) {
    filterString = `city=${filters.city}&state=${filters.state}`;
  } else {
    filterString = ``;
  }
  request = await axios.get(`/api/events?${filterString}`);
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
