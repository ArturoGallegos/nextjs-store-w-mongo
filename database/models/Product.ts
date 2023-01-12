import mongoose from 'mongoose';

export const productGender = ['man', 'woman', 'kid', 'unisex'];

const ProductSchema = new mongoose.Schema({
  name: {type: String, require: true, trim: true},
  description: String,
  price: {type: Number, require: true, default: 0},
  stock: {type: Number, default: 0},
  image: {type: String, trim: true},
  images: [{type: String, trim: true}],
  slug:  {type: String, require: true, unique: true, trim: true},
  sizes: [{type: String, require: true, enum: {
    values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    message: '{VALUE} is invalid XD'
  }, trim: true}],
  categories: [{type: String, trim: true}],
  gender: {type: String, enum: {values: productGender, message: "{VALUE} NO ES VALIDO"}, trim: true},
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
