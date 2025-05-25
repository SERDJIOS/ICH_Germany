import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Make title a required field
  },
  content: {
    type: String,
    required: true,  // Make content a required field
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  // Make user a required field
  }
});

const Post = mongoose.model("Post", postSchema);
export default Post;