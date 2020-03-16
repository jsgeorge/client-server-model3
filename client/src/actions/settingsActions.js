import axios from "axios";
import { GET_SETTINGS } from "./types";

// export const getSettings = uid => async dispatch => {
//   const request = await axios.get(`/api/settings?uid=${uid}`);
//   dispatch({ type: GET_SETTINGS, payload: request.data });
// };
export function chgDefaultCity(chgcitydata) {
  console.log("actions", chgcitydata);
  return dispatch => {
    return axios.post(`/api/settings/chgDefaultCity`, chgcitydata);
  };
}
