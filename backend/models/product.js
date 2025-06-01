import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
}, { timestamps: true }); // Add timestamps to track createdAt and updatedAt

const Product = mongoose.model('Product', productSchema);

export default Product; // Ensure the model is exported as default