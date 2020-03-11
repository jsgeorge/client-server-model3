import axios from "axios";
import { GET_SETTINGS } from "./types";

export const getSettings = id => async dispatch => {
  const request = await axios.get(`/api/settings?id=${id}`);
  dispatch({ type: GET_SETTINGS, payload: request.data });
};
export function chgDefaultCity(city, uid) {
  return dispatch => {
    return axios.post(`/api/settings/chgDefaultCity?uid=${uid}`, city);
  };
}
