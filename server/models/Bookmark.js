const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,
    description: String,
    imageUrl: String,
    url: String,
    date: String,
    author: String,
    source: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);