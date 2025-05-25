import mongoose from "mongoose";
import "dotenv/config";

const connectionString =
  process.env.MONGO_URI ||
  "mongodb+srv://Serdjios:302711@db.gpiesav.mongodb.net/DB/29april";

const connectDb = async () =>{
  try {
    await mongoose.connect(connectionString)
    console.log("Database is connected")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
export default connectDb