const mongoose = require("mongoose");

const settingSchema = mongoose.Schema({
  filterCity: {
    type: String,
    require: true,
    trim: true
  },
  filterState: {
    type: String,
    require: true,
    trim: true
  }
});

const Setting = mongoose.model("Setting", settingSchema);

module.exports = { Setting };
