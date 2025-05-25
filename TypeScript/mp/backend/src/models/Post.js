import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  body:       { type: String, required: true },
  imageUrl:   { type: String },
  gifUrl:     { type: String },
  videoUrl:   { type: String },
  author:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt:  { type: Date, default: Date.now }
});

export const Post = mongoose.model("Post", postSchema);