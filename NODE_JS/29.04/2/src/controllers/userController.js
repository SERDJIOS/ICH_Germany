import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });
    res.status(201).json({ message: "User successfully created", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user.password); // сравнение введенного и имеющегося пароля
    if (!user || !checkPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); //подписываем токен (как работает jwt.sign? - )
    res.status(200).json({ message: "User was logged in", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
