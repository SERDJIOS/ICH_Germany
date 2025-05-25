import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { User } from "../models/user.js";
dotenv.config();

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as RegisterBody;
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
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginBody;
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
      process.env.JWT_SECRET as string, 
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
  } catch (err: any) {
    console.error('Ошибка входа:', err);
    res.status(500).json({ error: err.message });
  }
}; 