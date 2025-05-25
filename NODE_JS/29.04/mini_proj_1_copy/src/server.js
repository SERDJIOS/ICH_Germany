import express from "express";
import "dotenv/config";
// import { connect } from "mongoose";
import connectDb from "./config/db.js";
import userRoutes from "./routers/userRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/auth", userRoutes);
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
