// src/routes/productRoutes.js
import express from "express";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

// POST запрос на создание продукта
router.post("/products", createProduct);

export default router;