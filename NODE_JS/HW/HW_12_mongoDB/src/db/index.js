import dotenv from 'dotenv';
dotenv.config();  // ← обязательно В САМОМ ВЕРХУ

import { MongoClient } from 'mongodb';

console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI);

const client = new MongoClient(process.env.MONGODB_URI);

let db;

export async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export function getDb() {
    return db;
}