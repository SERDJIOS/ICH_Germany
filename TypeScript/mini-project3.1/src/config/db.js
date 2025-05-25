import mongoose from "mongoose";
import 'dotenv/config'

const connectionString = process.env.MONGO_URI

const connectDB = async() => {
    try {
        await mongoose.connect(connectionString)
        console.log('Database is connected');
        
    } catch (error) {
        console.error(error);
        process.exit(1)
        
    }
}

export default connectDB;