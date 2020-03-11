const { Setting } = require("../models/settings");

const router = require("express").Router();

router.get("/", (req, res) => {
  Setting.findOne({ uid: req.query.id }, (err, setting) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(setting);
  });
});

router.post("/chgDefaultCity", (req, res) => {
  let id = req.query.uid;

  Setting.findOneAndUpdate(
    { uid: id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err) return res.satus(402).json({ success: false, err });
      res.status(200).json({ success: true });
    }
  );
});

module.exports = router;
