const mongoose = require("mongoose");
// schema defining
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  job_title: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("userData", userSchema);

module.exports = User