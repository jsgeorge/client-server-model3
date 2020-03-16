const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const config = require("../config");
const User = require("../models/users");

const router = require("express").Router();

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

router.post("/", (req, res) => {
  const { identifier, password, username, timezone } = req.body;
  const password_digest = bcrypt.hashSync(password, 10);

  const user = new User({
    email: identifier,
    password: password_digest,
    username: username,
    timezone: timezone,
    defaultCity: "",
    defaultState: ""
  });

  User.findOne({ email: identifier }, function(err, existingUser) {
    if (err) {
      return res.status(400).json({ errors: { form: err } });
    }
    if (existingUser) {
      return res.status(400).json({ errors: { form: "Email already in use" } });
    }

    user.save(function(err) {
      if (err) {
        return res.status(400).json({ errors: { form: err } });
      }
      // res.json({
      //   token: tokenForUser(user)
      // });
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).json({ errors: { form: err } });
        }
        res.status(200).json({
          success: true,
          token: user.token
        });
      });
    });
  });
});

router.get("/", (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(users);
  });
});

module.exports = router;
