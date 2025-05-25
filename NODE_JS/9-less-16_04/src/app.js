import express from 'express'
import 'dotenv/config'
import sequelize from '../config/db'

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json)

app.get('/', (req, res) =>{
  res.send('Hello sequelize')
})
app.listen(PORT, async () =>{
  try {
    await sequelize.authenticate()
    console.log('Successfully connected to the port')
    console.log(`Server is listening on port ${PORT}`)
  
  } catch (error) {
    console.error('unable to connect to the DB: ', error)
  }
})
