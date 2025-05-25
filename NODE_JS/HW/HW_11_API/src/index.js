import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/HW', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Mongoose schema и модель
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 }
});
const Product = mongoose.model('Product', productSchema);

// GET /products (список всех продуктов)
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// GET /products/:id (конкретный продукт)
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: 'Invalid ID' });
    }
});

// POST /products (создание продукта)
app.post('/products', async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /products/:id (обновление продукта)
app.put('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, price: req.body.price },
            { new: true, runValidators: true }
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /products/:id (удаление продукта)
app.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});