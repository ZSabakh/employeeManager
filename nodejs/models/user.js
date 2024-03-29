const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3, max: 255 },
  password: { type: String, required: true, min: 3, max: 2000 },
});

module.exports = mongoose.model("HRUsers", userSchema);
