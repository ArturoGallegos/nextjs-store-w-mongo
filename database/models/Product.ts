import mongoose from 'mongoose';

export const productSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const productGender = ['men', 'women', 'kid', 'unisex'];

const ProductSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  description: String,
  price: { type: Number, require: true, default: 0 },
  stock: { type: Number, default: 0 },
  image: { type: String, trim: true },
  images: [{ type: String, trim: true }],
  slug: { type: String, require: true, unique: true, trim: true },
  sizes: [
    {
      type: String,
      require: true,
      enum: {
        values: productSizes,
        message: '{VALUE} is invalid XD',
      },
      trim: true,
    },
  ],
  categories: [{ type: String, trim: true }],
  gender: { type: String, enum: { values: productGender, message: '{VALUE} NO ES VALIDO' }, trim: true },
  active: { type: Boolean, default: true },
});

const Product = mongoose.models?.Product || mongoose.model('Product', ProductSchema);

export default Product;
