const { Category } = require("../models/categories");

const router = require("express").Router();

router.get("/", (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(categories);
  });
});

module.exports = router;
