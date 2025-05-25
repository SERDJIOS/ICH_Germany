import express from "express";
import { connectToDatabase, getDb } from "./db/index.js";
import { ObjectId } from "mongodb";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({ message: "hello home page" });
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection("users").find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const db = getDb();
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Create new user
app.post("/users", async (req, res) => {
  try {
    const db = getDb();
    
    // Обработка: если приходит один объект — обернём в массив
    const users = Array.isArray(req.body) ? req.body : [req.body];

    // Проверка: у всех ли объектов есть нужные поля
    const isInvalid = users.some(u => !u.name || !u.email || !u.age);
    if (isInvalid) {
      return res.status(400).json({ error: "All fields are required for each user" });
    }

    const result = await db.collection("users").insertMany(users);
    res.status(201).json({
      message: `Inserted ${result.insertedCount} user(s)`,
      ids: result.insertedIds
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to create user(s)" });
  }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const db = getDb();
        const userId = req.params.id
        if(!ObjectId.isValid(userId)) {
            return res.status(400).json({error: 'invalid user ID'})
        }
        const result = await db.collection('users').deleteOne(
            {_id: new ObjectId(userId)},
        )
        if(result.matchCount === 0) {
            return res.status(404).json({error: 'User not found'})
        }
        res.status(200).json({message: 'User was successfully deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Error changing user'})
    }
})

// Start the server after DB is connected
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log("✅ Server is running on PORT " + port);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start the server due to MongoDB error:", err);
  });
