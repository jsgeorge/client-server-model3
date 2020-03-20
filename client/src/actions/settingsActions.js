import axios from "axios";
import { GET_SETTINGS } from "./types";

export const getSettings = () => async dispatch => {
  const request = await axios.get(`/api/users/auth`);
  dispatch({ type: GET_SETTINGS, payload: request.data });
};
export function chgDefaultCity(chgcitydata) {
  console.log("actions", chgcitydata);
  return dispatch => {
    return axios.post(`/api/users/chgDefaultCity`, chgcitydata);
  };
}
