import express from "express";
import { userRegister, userLogin } from "../controllers/userController.js";

const router = express.Router();

// Используй userRegister и userLogin для регистрации и логина
router.post("/register", userRegister);
router.post("/login", userLogin);

export default router;
