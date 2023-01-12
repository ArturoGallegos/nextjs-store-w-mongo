import db from 'database/db';
import Product from 'database/models/Product';
import products from 'fake-data/products';
import { NextApiRequest, NextApiResponse } from 'next';

const productsSeed = async (_: NextApiRequest, res: NextApiResponse) => {
  db.connect();
  await Product.deleteMany();
  await Product.insertMany(products);
  db.disconnect();

  res.json({ok: true})
}

export default productsSeed;
