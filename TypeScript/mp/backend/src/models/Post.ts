import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.js";

export interface IPost extends Document {
  title: string;
  body: string;
  imageUrl?: string;
  gifUrl?: string;
  videoUrl?: string;
  author: IUser["_id"];
  likes: IUser["_id"][];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    imageUrl: { type: String },
    gifUrl: { type: String },
    videoUrl: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", postSchema); 