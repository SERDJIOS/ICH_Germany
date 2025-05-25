import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  groups:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  }]
})

const User = mongoose.model('User', userSchema)

export default User