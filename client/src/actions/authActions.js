import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { SET_CURRENT_USER } from "./types";
import jwtDecode from "jwt-decode";
//import jwt from 'jsonwebtoken';

export function login(data) {
  return (dispatch) => {
    return axios.post("/api/auth", data).then((res) => {
      const token = res.data.token;
      localStorage.setItem("jwtToken", token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  };
}

export function userSignupRequest(userData) {
  return (dispatch) => {
    return axios.post("/api/users", userData);
  };
}

export function isUserExists(identifier) {
  return (dispatch) => {
    return axios.get(`/api/users/${identifier}`);
  };
}
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
