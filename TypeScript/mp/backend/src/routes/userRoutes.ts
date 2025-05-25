import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { getUsers } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", authMiddleware, getUsers);

export default router; 