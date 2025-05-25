import express from "express";
import { createGroup } from "../controllers/groupController.js";
import { authenticate } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/create", authenticate, createGroup);

export default router;