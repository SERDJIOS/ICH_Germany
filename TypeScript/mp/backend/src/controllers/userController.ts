import { Request, Response } from "express";
import { User } from "../models/user.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}; 