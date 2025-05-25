import Product from '../models/Products.js'

export const addProductItem = async (req, res) => {
  try {
    const { name, quantity, price } = req.body
    if (!name || !price) {
      return res.status(400).json({ error: 'error required data' })
    }
    const newProduct = await Product.create({
      name,
      quantity,
      price,
    })
    res.status(201).json({ message: 'Product was created', newProduct })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
