import express from "express";
import "dotenv/config";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

import authenticateJWT from "./src/middleWares.js";

const app = express();
const PORT = process.env.PORT || 3333;
app.use(express.json());

const users = [
  {
    id: "1",
    email: "test@test.com",
    password: await bcrypt.hash("qwerty123", 10),
  },
];
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = users.find((item) => item.email === email);
    if (!user) res.status(404).json({ error: "User not found" });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      res.status(401).json({ error: "Password is incorrect" });
    const token = JWT.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_secret,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Error login", errorDesc: error });
  }
});
app.get('/profile', authenticateJWT, (req,res) => {
    res.json({message: 'Profile 1', id: req.user.id, email: req.user.email})
})
app.listen(PORT, () => {
  console.log(`Listening on port http://127.0.0.1:${PORT}`);
});
