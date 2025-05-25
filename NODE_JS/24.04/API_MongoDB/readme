Инициализация express + mongo сервера
1. npm init -y
2. npm i express mongodb mongoose dotenv
3. npm i nodemon -D
4. type: module
5. Создаем .env файл, в него  MONGO_URI - берем строку подключения из compass
mongodb+srv://username:password@cluster0.naxvs.mongodb.net/24-april
PORT=3000
и остальное по необходимости
6. Создаем папку внутри src - db, в ней index.js файл.Это файл подключения к серверу
import 'dotenv/config'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)
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
7. внутри server.js 
import express from 'express'
import { connectToDatabase } from './db/index.js'


const app = express()

app.use(express.json())
const port = process.env.PORT || 3333
app.get('/', (req, res) => {
    res.json({message: 'hello home page'})
})
connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log('Server is running on PORT '+ port)
        })
    })
    .catch((err) => {
        console.error('Failed to start the server due to mongoDB error ', err)
    })