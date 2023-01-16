import { productGender, productSizes } from 'database/models/Product';

interface Product {
  _id: string;
  code?: string;
  name: string;
  slug?: string;
  price?: number;
  description?: string;
  image?: string;
  images?: string[];
  active?: boolean;
  stock?: number;
  sizes: typeof productSizes;
  categories?: string[];
  gender?: typeof productGender;
}

interface ProductCreate extends Omit<Product, '_id'> {}
