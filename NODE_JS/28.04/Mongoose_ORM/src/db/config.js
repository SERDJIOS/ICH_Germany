import mongoose from "mongoose";
import 'dotenv/config'

const connectionString = process.env.MONGO_URI || 'mongodb+srv://Serdjios:302711@cluster0.xevpbfy.mongodb.net/cluster'

mongoose.connect(connectionString, {})
    .then(() => {
        console.log('Successfully connected to MongoDB')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB: ', error)
    })