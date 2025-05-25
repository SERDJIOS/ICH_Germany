import mongoose from "mongoose";
import User from "./User";
const postSchema = new mongoose.Schema({
  title: {
    type: String
  }, 
  description:{
    type: String
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  
  }
})
const Post = mongoose.model(Post, postSchema)
export default Post