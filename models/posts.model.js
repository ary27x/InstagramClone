const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const PostSchema = new mongoose.Schema(
  {
    picture: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      required: true,
    },
    by: { type: ObjectId, ref: "user" },
    likes: [
      {
        type: ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        comment: {
          type: String,
          trim: true,
        },
        commentedBy: {
          type: ObjectId,
          ref: "user",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Post", PostSchema.index());
