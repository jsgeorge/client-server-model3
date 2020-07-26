const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
//const jwt = require("jsonwebtoken");
const SALT_I = 10;
const config = require("../config");

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  location: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    trim: true,
  },
  userid: {
    type: String,
    require: true,
    trim: true,
  },
  eventDate: {
    type: String,
    require: true,
  },
  eventTime: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
  ticketsFrom: {
    type: Number,
    require: true,
  },
  ticketsTo: {
    type: Number,
    require: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };
