import 'dotenv/config'
import { MongoClient } from 'mongodb'
import { ObjectId } from "mongodb";

const uri = process.env.MONGO_URI


const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000
});

let dbConnection
async function connectToDatabase() {
    try {
        await client.connect()
        console.log('Connected successfully to MongoDB')
        dbConnection = client.db()
    }catch(err) {
        console.error('Failed to connect to MongoDB', err)
        throw err
    }
}

function getDb() {
    if(!dbConnection) {
        throw new Error('Database is not connected')
    }
    return dbConnection
}

export {connectToDatabase, getDb}