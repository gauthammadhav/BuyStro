import express from 'express';

const router = express.Router();
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'; // Import the product controller functions
router.get("/",getProducts);
router.post("/",createProduct);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);

export default router;