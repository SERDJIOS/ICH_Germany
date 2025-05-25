import Product from "../../../../3/src/models/Product.js";

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