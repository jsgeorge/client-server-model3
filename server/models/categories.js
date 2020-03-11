const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    unique: 1
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
