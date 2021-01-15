const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  description: {
    type: String,
    required: [true, "The description cannot be blank."],
  },
  imageUrl: {
    type: String,
    required: [true, "You need to upload and image."],
  },
  hashtags: [String],
  author: {
    _id: {
      type: mongoose.Schema.ObjectId,
      required: [true, "The User Id cannot be null"],
    },
    name: {
      type: String,
      required: [true, "The user's name cannot be blank."],
    },
    email: {
      type: String,
      required: [true, "The user's email cannot be blank."],
    },
  },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Image", imageSchema);
