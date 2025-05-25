import jwt from "jsonwebtoken"; 
import User from "../models/User.js"; 
 
export const authenticate = async (req, res, next) => { 
  const token = req.header("Authorization")?.replace("Bearer ", ""); 
   
  if (!token) { 
    return res.status(401).json({ error: "No token, authorization denied" }); 
  } 
 
  try { 
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const user = await User.findById(decoded.userId); 
 
    if (!user) { 
      return res.status(401).json({ error: "User not found" }); 
    } 
 
    req.userId = user._id; // Добавляем userId в запрос 
    next(); 
  } catch (error) { 
    console.error(error); // Печать ошибки для отладки 
    res.status(401).json({ error: "Invalid token" }); 
  } 
};