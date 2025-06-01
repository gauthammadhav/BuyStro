import mongoose from 'mongoose';
import Product from '../models/product.js'; // Import the Product model
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Use the imported Product model
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in Get products:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createProduct = async (req, res) => {
  const productData = req.body;

  if (!productData.name || !productData.price || !productData.image) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // ✅ Convert price to number
  productData.price = Number(productData.price);

  const newProduct = new Product(productData);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const updateProduct =  async (req, res) => {
    const { id } = req.params;

    const product= req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid product ID' });
    }
    try {
        const updatedProduct= await Product.findByIdAndUpdate(id, product, { new: true });     // Use the imported Product model
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const deleteProduct = async(req,res)=> {
    const {id}= req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid product ID' });
    }

    try {
        await Product.findByIdAndDelete(id); // Use the imported Product model
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.log("Error in Delete product:", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};