import express from "express";
import { userLogin, userRegister } from "../controllers/userController.js";

const router = express.Router();

// router.post("/register", (req, res) =>{
//   // так не используем, а декомпозируем
// })

router.post("/register", userRegister);
router.post("/login", userLogin)

export default router;
