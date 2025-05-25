import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { name, username, email } = req.body;
    const newUser = await User.create({
      name,
      username,
      email,
    });
    res.status(201).json({
      message: "User successfully created!",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user", errorDesc: error });
  }
};