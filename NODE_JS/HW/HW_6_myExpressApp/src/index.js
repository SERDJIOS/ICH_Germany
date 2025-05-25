// index.js
import express from 'express';
import { db } from './db.js';


const app = express();
const PORT = 3001;

app.use(express.json());

// GET /
app.get('/', (req, res) => {
  try {
    res.send('Hello, World!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST /
app.post('/', (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).send('No data provided');
    res.send(`Received data: ${JSON.stringify(data)}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing request');
  }
});

// GET /products
app.get('/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
});

// POST /products
app.post('/products', async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).send('Name and price required');
  try {
    await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
    res.send('Product added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding product');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
