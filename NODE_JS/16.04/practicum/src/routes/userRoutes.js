// src/routes/userRoutes.js
import express from "express";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

// POST запрос на создание пользователя
router.post("/users", createUser);

export default router;