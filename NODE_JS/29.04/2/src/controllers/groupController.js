import Group from "../models/Group.js";
import User from "../models/User.js";

export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await Group.findOne({ name });
    if (existing) return res.status(400).json({ error: "Group already exists" });

    const group = new Group({
      name,
      members: [req.userId] // добавим создателя сразу в участники
    });

    await group.save();
    res.status(201).json({ message: "Group created", group });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};