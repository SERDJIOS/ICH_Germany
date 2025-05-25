import express from 'express'
import dotenv from 'dotenv/config'
import sequelize from './config/db.js'
import User from './models/user.js'
import { use } from 'bcrypt/promises.js'
import bcrypt from 'bcrypt'


const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3333

app.get('/', (req, res) =>{
  res.send('Hi sequelize')
})

app.post('/register', async (req,res) => {
  try { 
    const {name,username,email,password} = req.body
    if(!name || !username || !email || !password){
      return res.status(400).json({error: 'All fields are required'})
     
      
    }
    const newUser = await User.create({name,username,email,password})
    res.status(201).json({message: 'User was successfully created', user: newUser})
  } catch (error) {
    res.status(500).json({error: error})
  }
})
app.post('/login', async (req,res) => {
  try { 
   const {email,password} = req.body;
   if (!email || !password) {
    return res.status(400).json({error: 'email and password are'})
    
   }
   const existingUser = await User.findOne({where: {email}})
      if(!existingUser){
        return res.status(404).json({message: 'User not found!' })
      }
      const validPassword = await bcrypt.compare(password, existingUser.password);
      if(!validPassword){
         return res.status(401).json({message: 'invalid password'})
      }
      res.json({message: 'Login successfully!', userId: existingUser.id})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.get('/users',async (req,res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    res.status(400).json({error})
  }
})
  


app.listen(PORT, async () =>{
  
    try {
      await sequelize.authenticate()
      console.log(`server successfully`);
      console.log(`server running on the PORT ${PORT}`);
      
      
  
  
    } catch (error) {
      console.log('unable to connect to the DB: ', error)
    }
})