import express from 'express'
import connectDb from './db/config.js'
import User from './models/User.js'

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.get("/", (req, res) =>{
  res.json({message: 'Home page'})
})
app.post("/users", async (req,res) => {
  try {
    const {name, email, password} = req.body
    if(!name, !email, !password){
      return res.status(400).json({message: 'All field are required'})
    }
    const user1 = await User.create({name, email, password})
    res.status(201).json({message: 'User was successfully', user})
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "User was not created"})
  }
})


// app.post('/groups', async (req,res) => {
//   try {
//     const {name,users} = req.body
//     if(!name || !members)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({error: 'Error'})
//   }
// })



app.listen(PORT, async () =>{
  try {
    await connectDb()
    console.log(`Server is listening on port: ${PORT}`)
  } catch (error) {
    console.log("server doesn't work")
    
  }
})