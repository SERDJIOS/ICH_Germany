import express from "express";
import { sendMessage, getConversation, getConversations, markAsRead } from "../controllers/messageController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All message routes require authentication
router.use(authMiddleware);

// Send a new message
router.post("/", sendMessage);

// Get all conversations for the current user
router.get("/conversations", getConversations);

// Get conversation with a specific user
router.get("/conversation/:userId", getConversation);

// Mark all messages from a user as read
router.put("/read/:userId", markAsRead);

export default router; 