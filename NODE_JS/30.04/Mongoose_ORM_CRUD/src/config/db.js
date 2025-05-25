import mongoose from "mongoose";
import "dotenv/config";

// Используем переменную окружения или строку по умолчанию
const connectionString =
  process.env.MONGO_URI || "mongodb+srv://Serdjios:302711@db.gpiesav.mongodb.net/db";

const connectDb = async () => {
  try {
    await mongoose.connect(connectionString); // без лишних опций
    console.log("Database is connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDb;
