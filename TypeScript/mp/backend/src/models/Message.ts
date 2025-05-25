import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.js";

export interface IMessage extends Document {
  sender: IUser["_id"];
  recipient: IUser["_id"];
  text: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    recipient: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    text: { 
      type: String, 
      required: true,
      trim: true
    },
    read: { 
      type: Boolean, 
      default: false 
    }
  },
  { timestamps: true }
);

// Compound index to efficiently query conversations between users
messageSchema.index({ sender: 1, recipient: 1 });
messageSchema.index({ createdAt: -1 });

export const Message = mongoose.model<IMessage>("Message", messageSchema); 