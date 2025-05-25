import { Request, Response } from 'express';
import Message from '../models/Message';
import mongoose from 'mongoose';

// Send a new message to a user
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { recipientId, text } = req.body;
    
    if (!recipientId || !text) {
      return res.status(400).json({ 
        success: false, 
        message: 'Получатель и текст сообщения обязательны' 
      });
    }
    
    // Validate recipientId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(recipientId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Некорректный ID получателя' 
      });
    }
    
    const newMessage = new Message({
      sender: req.user?._id,
      recipient: recipientId,
      text,
      read: false
    });
    
    const savedMessage = await newMessage.save();
    await savedMessage.populate('sender', 'username avatar');
    
    res.status(201).json({ 
      success: true, 
      message: savedMessage 
    });
  } catch (error: any) {
    console.error('Error sending message:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Ошибка при отправке сообщения' 
    });
  }
};

// Get all conversations for current user
export const getConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    
    // Find all unique conversations the user has
    const conversations = await Message.aggregate([
      // Match messages where user is either sender or recipient
      {
        $match: {
          $or: [
            { sender: userId },
            { recipient: userId }
          ]
        }
      },
      // Sort by date descending to get the latest message first
      { $sort: { createdAt: -1 } },
      // Group by the conversation partner (the other user)
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$recipient",
              else: "$sender"
            }
          },
          lastMessage: { $first: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [
                  { $eq: ["$recipient", userId] },
                  { $eq: ["$read", false] }
                ]},
                1,
                0
              ]
            }
          }
        }
      },
      // Look up user details for the conversation partner
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      // Unwind the user array to get a single user object
      { $unwind: "$user" },
      // Project only the needed fields
      {
        $project: {
          _id: 1,
          user: {
            _id: 1,
            username: 1,
            avatar: 1
          },
          lastMessage: {
            _id: 1,
            text: 1,
            createdAt: 1,
            sender: 1,
            recipient: 1,
            read: 1
          },
          unreadCount: 1
        }
      },
      // Sort by the date of the last message
      { $sort: { "lastMessage.createdAt": -1 } }
    ]);
    
    res.status(200).json({
      success: true,
      conversations
    });
  } catch (error: any) {
    console.error('Error getting conversations:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Ошибка при получении списка диалогов'
    });
  }
};

// Get messages between current user and another user
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user?._id;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Некорректный ID пользователя'
      });
    }
    
    // Find all messages between the two users
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, recipient: userId },
        { sender: userId, recipient: currentUserId }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('sender', 'username avatar')
    .populate('recipient', 'username avatar');
    
    // Mark messages as read
    await Message.updateMany(
      {
        sender: userId,
        recipient: currentUserId,
        read: false
      },
      { read: true }
    );
    
    res.status(200).json({
      success: true,
      messages
    });
  } catch (error: any) {
    console.error('Error getting messages:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Ошибка при получении сообщений'
    });
  }
};

// Delete a message (for the current user only)
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const userId = req.user?._id;
    
    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({
        success: false,
        message: 'Некорректный ID сообщения'
      });
    }
    
    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Сообщение не найдено'
      });
    }
    
    // Check if user is the sender
    if (message.sender.toString() !== userId?.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Можно удалять только свои сообщения'
      });
    }
    
    await Message.findByIdAndDelete(messageId);
    
    res.status(200).json({
      success: true,
      message: 'Сообщение удалено'
    });
  } catch (error: any) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Ошибка при удалении сообщения'
    });
  }
}; 