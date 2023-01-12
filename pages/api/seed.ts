import db from 'database/db';
import Product from 'database/models/Product';
import products from 'fake-data/products';

import { NextApiRequest, NextApiResponse } from 'next';

const seedApi = async (_: NextApiRequest, res: NextApiResponse) => {
  db.connect()

  await Product.deleteMany()
  await Product.insertMany(products)

  db.disconnect();

  return res.status(201).send({
    ok: true,
  })
}

export default seedApi;
