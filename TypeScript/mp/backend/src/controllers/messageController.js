import { Message } from "../models/Message.js";
import { User } from "../models/user.js";
import mongoose from "mongoose";

// Get conversations (unique users the current user has messaged with)
export const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all messages where the user is either sender or recipient
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: mongoose.Types.ObjectId(userId) },
            { recipient: mongoose.Types.ObjectId(userId) }
          ]
        }
      },
      {
        // Group by the other user in the conversation
        $addFields: {
          otherUser: {
            $cond: {
              if: { $eq: ["$sender", mongoose.Types.ObjectId(userId)] },
              then: "$recipient",
              else: "$sender"
            }
          }
        }
      },
      {
        // Group by other user and get the latest message
        $group: {
          _id: "$otherUser",
          lastMessage: { $last: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [
                  { $eq: ["$recipient", mongoose.Types.ObjectId(userId)] }, 
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
        // Lookup user details
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
      {
        // Project final result
        $project: {
          _id: 1,
          lastMessage: 1,
          unreadCount: 1,
          name: "$userDetails.name",
          email: "$userDetails.email"
        }
      },
      { $sort: { "lastMessage.createdAt": -1 } }
    ]);

    res.json(conversations);
  } catch (err) {
    console.error("Error fetching conversations:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get messages between current user and another user
export const getMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const otherUserId = req.params.userId;

    // Validate otherUserId
    if (!mongoose.Types.ObjectId.isValid(otherUserId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find all messages between these two users
    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: otherUserId },
        { sender: otherUserId, recipient: userId }
      ]
    })
    .sort({ createdAt: 1 })
    .populate("sender", "name email");

    // Mark messages as read if they were sent to the current user
    await Message.updateMany(
      { sender: otherUserId, recipient: userId, read: false },
      { read: true }
    );

    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: err.message });
  }
};

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { recipientId, text } = req.body;

    // Validate input
    if (!recipientId || !text) {
      return res.status(400).json({ message: "Recipient ID and message text are required" });
    }

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // Create and save the message
    const message = new Message({
      sender: req.user._id,
      recipient: recipientId,
      text
    });

    await message.save();

    // Populate sender info
    await message.populate("sender", "name email");

    res.status(201).json(message);
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get list of all users for messaging
export const getUsersForMessaging = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    
    // Get all users except the current user
    const users = await User.find({ _id: { $ne: currentUserId } })
      .select("name email")
      .sort({ name: 1 });
    
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: err.message });
  }
}; 