import express from "express";
import "dotenv/config";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { authenticate } from "./middlewares/authMiddleWare.js";
import groupRoutes from "./routes/groupRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/groups", groupRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Home page" });
});

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`server is listening on port: ${PORT}`);
  } catch (error) {
    console.log("server doesn't work");
  }
});