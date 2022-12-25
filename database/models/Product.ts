import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
