import express from "express";
import { createPost, getPostsByUser } from "../controllers/postController.js";
import authenticate from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/create", authenticate, createPost);
router.get("/", authenticate, getPostsByUser);

export default router;