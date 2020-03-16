const router = require("express").Router();
const { authenticate } = require("../middleware/authenticate");
const { User } = require("../models/users");

// router.get("/", (req, res) => {
//   let uid = req.body.uid;
//   console.log(uid);
//   User.findOne({ uid: uid }, (err, setting) => {
//     if (err) return res.status(400).send(err);
//     return res.status(200).send(setting);
//   });
// });

router.post("/chgDefaultCity", (req, res) => {
  let id = req.body.uid;
  console.log(id, req.body.defaultCity, req.body.defaultState);
  let citystate = {
    defaultCity: req.body.defaultCity,
    defaultState: req.body.defaultState
  };
  console.log(citystate);
  User.findOneAndUpdate(
    { uid: id },
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
