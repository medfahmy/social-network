const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  bio: {
    type: String,
  },
  age: {
    type: String,
  },
  employment: {
    type: String,
  },
  location: {
    type: String,
  },
  rel_status: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
