const router = require("express").Router();
const { authenticate } = require("../middleware/authenticate");
const { User } = require("../models/users");

module.exports = router;
