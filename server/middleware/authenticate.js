//import jwt from "jwt-simple";
const jwt = require("jsonwebtoken");
//import config from "../src/config";
const config = require("../config");
const User = require("../models/users");

const authenticate = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  let token;
  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        console.log("ERROR", err);
        res.status(401).json({ error: "failed to authenticate" });
      } else {
        User.findOne({ _id: decoded.id }, (err, user) => {
          if (err) {
            console.log("ERROR", err);
            res.status(401).json({ error: err });
          }
          if (!user) {
            console.log("ERROR", "No such user");
            res.status(404).json({ error: "No such user" });
          } else {
            let cuser = {
              _id: user._id,
              email: user.email,
              username: user.username,
              defaultCity: user.defaultCity,
              defaultState: user.defaultState
            };
            //   console.log("In Authenticate.js , currentUser=", cuser);
            req.currentUser = cuser;

            // User.findByToken(token, (err, user) => {
            //   if (err) {
            //     console.log("ERROR", err);
            //     res.status(400).json({ error: err });
            //   }
            //   if (!user) res.status(401).json({ error: "no such user" });
            //   req.user = user;
            next();
          }
        });
      }
    });
  } else {
    res.status(403).json({ error: "No token provided" });
  }
};

module.exports = { authenticate };
