const mongoose = require("mongoose");

const graffitiSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  title: {
    type: String,
    required: [true, "The title cannot be blank."],
    maxlength: [30, "Graffiti Title Is To Long !"],
  },
  author: {
    author_id: {
      type: mongoose.Schema.ObjectId,
      required: [true, "The Author Id cannot be null"],
    },
    name: {
      type: String,
      required: [true, "The Author Name cannot be blank."],
    },
  },
  votes: {
    positives: [
      {
        _id: {
          type: mongoose.Schema.ObjectId,
          required: [true, "The User Id cannot be null"],
        },
      },
    ],
    negatives: [
      {
        _id: {
          type: mongoose.Schema.ObjectId,
          required: [true, "The User Id cannot be null"],
        },
      },
    ],
  },
  comments: [
    {
      _id: {
        type: mongoose.Schema.ObjectId,
        required: [true, "The Comment Id cannot be null"],
      },
      author: {
        author_id: {
          type: mongoose.Schema.ObjectId,
          required: [true, "The Author Id cannot be null"],
        },
        name: {
          type: String,
          required: [true, "The Author Name cannot be blank."],
        },
      },
      message: {
        type: String,
        required: [true, "The Message cannot be blank."],
      },
      date: Date,
      votes: {
        positives: [
          {
            _id: {
              type: mongoose.Schema.ObjectId,
              required: [true, "The User Id cannot be null"],
            },
          },
        ],
        negatives: [
          {
            _id: {
              type: mongoose.Schema.ObjectId,
              required: [true, "The User Id cannot be null"],
            },
          },
        ],
      },
    },
  ],
  tags: [String],
  location: { lat: Number, lon: Number },
  date: { type: Date, default: Date.now() },
  description: {
    type: String,
    required: [true, "The description cannot be blank."],
    maxlength: [500, "Description Name Is To Long !"],
  },
  image: {
    type: String,
    required: [true, "It needs a image!"],
  },
  state: String,
});

module.exports = mongoose.model("Graffiti", graffitiSchema);
