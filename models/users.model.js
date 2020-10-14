const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    profilePic: {
      type: String,
    },
    posts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    followings: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    saved: [
      {
        type: ObjectId,
        ref: "post",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", UserSchema);
