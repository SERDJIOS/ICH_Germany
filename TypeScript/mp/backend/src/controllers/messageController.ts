import { Request, Response } from "express";
import { Message } from "../models/Message.js";
import mongoose from "mongoose";

// Send a message to another user
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { recipient, text } = req.body;
    
    if (!recipient || !text) {
      return res.status(400).json({ message: "Получатель и текст сообщения обязательны" });
    }
    
    // Check if recipient is valid
    if (!mongoose.Types.ObjectId.isValid(recipient)) {
      return res.status(400).json({ message: "Некорректный ID получателя" });
    }
    
    const message = new Message({
      sender: req.user?._id,
      recipient,
      text,
      read: false
    });
    
    await message.save();
    
    // Populate sender info before sending response
    await message.populate("sender", "name email");
    
    res.status(201).json(message);
  } catch (err: any) {
    console.error("Ошибка отправки сообщения:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get conversation with another user
export const getConversation = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user?._id;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Некорректный ID пользователя" });
    }
    
    // Get messages between current user and specified user
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, recipient: userId },
        { sender: userId, recipient: currentUserId }
      ]
    })
    .sort({ createdAt: 1 }) // Sort by date ascending
    .populate("sender", "name email")
    .populate("recipient", "name email");
    
    res.json(messages);
  } catch (err: any) {
    console.error("Ошибка получения переписки:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all conversations for current user
export const getConversations = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user?._id;
    
    // Find all unique conversations where user is either sender or recipient
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: currentUserId },
            { recipient: currentUserId }
          ]
        }
      },
      {
        $sort: { createdAt: -1 } // Most recent first
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", currentUserId] },
              "$recipient",
              "$sender"
            ]
          },
          lastMessage: { $first: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [
                  { $eq: ["$recipient", currentUserId] },
                  { $eq: ["$read", false] }
                ]},
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          _id: 1,
          user: {
            _id: 1,
            name: 1,
            email: 1
          },
          lastMessage: {
            text: 1,
            createdAt: 1,
            read: 1
          },
          unreadCount: 1
        }
      }
    ]);
    
    res.json(conversations);
  } catch (err: any) {
    console.error("Ошибка получения списка переписок:", err);
    res.status(500).json({ error: err.message });
  }
};

// Mark all messages in a conversation as read
export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user?._id;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Некорректный ID пользователя" });
    }
    
    // Update all unread messages from the specified user to current user
    const result = await Message.updateMany(
      {
        sender: userId,
        recipient: currentUserId,
        read: false
      },
      {
        $set: { read: true }
      }
    );
    
    res.json({ success: true, messagesUpdated: result.modifiedCount });
  } catch (err: any) {
    console.error("Ошибка отметки сообщений как прочитанных:", err);
    res.status(500).json({ error: err.message });
  }
}; 