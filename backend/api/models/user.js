const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  name: {
    type: String,
    required: [true, "The user's name cannot be blank."],
  },
  email: {
    type: String,
    required: [true, "The user's email cannot be blank."],
  },
});

module.exports = mongoose.model("User", userSchema);
