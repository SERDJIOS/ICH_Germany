import express from 'express';
import { connectToDatabase, getDb } from './db/index.js';
import { ObjectId } from 'mongodb';

const app = express();
app.use(express.json());

async function startServer() {
    try {
        await connectToDatabase();
        const db = getDb();
        const productsCollection = db.collection('products');

        // POST /products
        app.post('/products', async (req, res) => {
            try {
                const { name, price, description } = req.body;
                const result = await productsCollection.insertOne({ name, price, description });
                res.status(201).json(result.ops[0]);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        // GET /products
        app.get('/products', async (req, res) => {
            try {
                const products = await productsCollection.find().toArray();
                res.json(products);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        // GET /products/:id
        app.get('/products/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const product = await productsCollection.findOne({ _id: new ObjectId(id) });
                if (!product) return res.status(404).json({ error: 'Product not found' });
                res.json(product);
            } catch (err) {
                res.status(500).json({ error: 'Invalid ID format' });
            }
        });

        // PUT /products/:id
        app.put('/products/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const { name, price, description } = req.body;
                const result = await productsCollection.findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: { name, price, description } },
                    { returnDocument: 'after' }
                );
                if (!result.value) return res.status(404).json({ error: 'Product not found' });
                res.json(result.value);
            } catch (err) {
                res.status(500).json({ error: 'Invalid ID format' });
            }
        });

        // DELETE /products/:id
        app.delete('/products/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) return res.status(404).json({ error: 'Product not found' });
                res.json({ message: 'Product deleted' });
            } catch (err) {
                res.status(500).json({ error: 'Invalid ID format' });
            }
        });

        app.listen(3001, () => {
            console.log('Server is running on http://localhost:3001');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

startServer();