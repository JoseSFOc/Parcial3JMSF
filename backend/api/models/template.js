const mongoose = require("mongoose");

const templateSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  title: {
    type: String,
    required: [true, "The title cannot be blank."],
    maxlength: [30, "Graffiti Title Is To Long !"],
  },
  author: {
    _id: {
      type: mongoose.Schema.ObjectId,
      required: [true, "The Author Id cannot be null"],
    },
    name: {
      type: String,
      required: [true, "The Author Name cannot be blank."],
    },
  },
  date: { type: Date, default: Date.now() },
  image: String,
  number: Number,
});

module.exports = mongoose.model("Template", templateSchema);
