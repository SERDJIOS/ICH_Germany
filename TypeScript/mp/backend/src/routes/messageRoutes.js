import express from "express";
import { 
  getConversations, 
  getMessages, 
  sendMessage,
  getUsersForMessaging
} from "../controllers/messageController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get all conversations for the current user
router.get("/conversations", getConversations);

// Get messages between current user and specified user
router.get("/:userId", getMessages);

// Send a message
router.post("/", sendMessage);

// Get list of all users for messaging
router.get("/users/all", getUsersForMessaging);

export default router; 