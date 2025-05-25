import express from "express";
import { createProduct, getProductsByUser } from "../controllers/productController.js";

const router = express.Router();


router.post("/products", createProduct);

router.get("/users/:userId/products", getProductsByUser);


export default router;