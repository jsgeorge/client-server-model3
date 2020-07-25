const bcrypt = require("bcrypt");
//const jwt = require("jwt-simple");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/users");
const { authenticate } = require("../middleware/authenticate");

const router = require("express").Router();

// function tokenForUser(user) {
//   const timestamp = new Date().getTime();
//   return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
// }
router.get("/auth", authenticate, (req, res) => {
  res.status(200).json({
    isAuth: true,
    email: req.currentUser.email,
    username: req.currentUser.username,
    defaultCity: req.currentUser.defaultCity,
    defaultState: req.currentUser.defaultState,
    timezone: req.currentUser.timezone,
  });
});
router.post("/", (req, res) => {
  const {
    identifier,
    password,
    username,
    timezone,
    defaultCity,
    defaultState,
  } = req.body;
  //const password_digest = bcrypt.hashSync(password, 10);
  console.log(req.body);

  const user = new User({
    email: identifier,
    password: password, //password_digest,
    username: username,
    timezone: timezone,
    defaultCity: defaultCity,
    defaultState: defaultState,
  });

  User.findOne({ email: identifier }, function (err, existingUser) {
    if (err) {
      return res.status(400).json({ errors: { form: "Unknown error" } });
    }
    if (existingUser) {
      return res.status(400).json({ errors: { form: "Email already in use" } });
    }

    user.save(function (err) {
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
          token: user.token,
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

router.post("/chgDefaultCity", authenticate, (req, res) => {
  let id = req.currentUser._id;
  console.log(id, req.body.defaultCity, req.body.defaultState);
  let citystate = {
    defaultCity: req.body.defaultCity,
    defaultState: req.body.defaultState,
  };
  console.log(citystate);
  User.findOneAndUpdate(
    { _id: id },
    { $set: citystate },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("error in updating settings for user");
        return res.satus(402).json({ errors: { form: err } });
      }
      console.log("Settiings for user successfully updated");
      res.status(200).json({ success: true });
    }
  );
});
module.exports = router;
