const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  title: {
    type: String,
    required: [true, "The title cannot be blank."],
    maxlength: [30, "The title Is To Long !"],
  },
  coordinates: {
    lat: {
      type: Number,
      required: [true, "The latitude cannot be blank"],
    },
    lon: {
      type: Number,
      required: [true, "The longitude cannot be blank"],
    },
  },
});

module.exports = mongoose.model("Location", locationSchema);
