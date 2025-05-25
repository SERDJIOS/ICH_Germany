import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)
let dbConnection

async function connectToDatabase() {
  try {
    dbConnection = client.db()
    await mongoose.connect(uri)
    console.log('Connected successfully to MongoDB via Mongoose')
  } catch (err) {
    console.error('Failed to connect to MongoDB', err)
    throw err
  }
}

function getDb() {
  if (!dbConnection) {
    throw new Error('Database is not connected')
  }
  return dbConnection
}

export { connectToDatabase, getDb }
