import bcrypt from "bcryptjs";
import jwt    from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js";
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hash });
    await user.save();
    res.status(201).json({ message: "Зарегистрирован успешно" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Неверный email или пароль" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Неверный email или пароль" });
    }
    
    // Установим время жизни токена - 7 дней
    const expiresIn = '7d';
    const expiresInSeconds = 7 * 24 * 60 * 60; // 7 дней в секундах
    const expirationDate = Math.floor(Date.now() / 1000) + expiresInSeconds;
    
    // Создаем JWT с информацией о пользователе и времени истечения
    const token = jwt.sign(
      { 
        id: user._id,
        name: user.name,
        email: user.email
      }, 
      process.env.JWT_SECRET, 
      { expiresIn }
    );
    
    // Возвращаем токен, информацию о пользователе и времени истечения
    res.json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      expiresAt: expirationDate // Timestamp когда истечет токен
    });
  } catch (err) {
    console.error('Ошибка входа:', err);
    res.status(500).json({ error: err.message });
  }
};