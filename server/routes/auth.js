const jwt = require("jwt-simple");
const config = require("../config");
const User = require("../models/users");

const router = require("express").Router();

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ id: user.id, username: user.username }, config.secret);
  // return jwt.sign(
  //   {
  //     id: user.id,
  //     username: user.username
  //   },
  //   config.secret
  // );
}

router.post("/", (req, res) => {
  const { identifier, password } = req.body;
  User.findOne({ email: identifier }, (err, user) => {
    if (!user)
      return res.status(401).json({
        errors: { form: "Login failed, email not found" }
      });
    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch)
        return res.status(401).json({
          errors: { form: "Login failed, Wrong password" }
        });

      res.status(200).json({
        token: tokenForUser(user)
      });
    });
  });
});

module.exports = router;
