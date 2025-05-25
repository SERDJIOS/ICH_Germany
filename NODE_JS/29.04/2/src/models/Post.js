import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title:{
    type: String,
  }, 
  content:{
    type: String,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  //прописываем отношение
  }
})

const Post = mongoose.model("Post", userSchema)
export default Post