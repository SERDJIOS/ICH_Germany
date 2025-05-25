import express from "express";
import { createPost, getPosts, deletePost } from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.delete("/:id", authMiddleware, deletePost);

export default router; 