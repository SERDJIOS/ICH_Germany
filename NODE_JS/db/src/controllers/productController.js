import Product from "../models/Product.js";
import User from "../models/User.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, userId } = req.body;
    const newProduct = await Product.create({
      name,
      price,
      description,
      userId,  // связь с пользователем
    });
    res.status(201).json({
      message: "Product successfully created!",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product", errorDesc: error });
  }
};

export const getProductsByUser = async (req, res) => {
    // const { userId } = req.params;
    const userId = req.params.userId;
  
    try {
      const user = await User.findByPk(userId, {
        include: {
          model: Product,
          as: 'products', 
        },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products', errorDesc: error });
    }
  };