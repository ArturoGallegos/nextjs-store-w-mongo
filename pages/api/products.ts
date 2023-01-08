import db from 'database/db';
import Product from 'database/models/Product';
import { NextApiRequest, NextApiResponse } from 'next';

// const generateProducts = (total: number) => {
//   return Array(total).fill('').map((_) => {
//     return {
//       id: id(),
//       name: faker.name.firstName(),
//       description: faker.lorem.paragraph(3),
//       price: faker.commerce.price(1, 800, 2),
//       image: defaultImage.src
//     };
//   })
// }

const productsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'GET') res.status(404).json({ok: false, message: 'Invalid method'});

  db.connect()
  const products = await Product.find({}).select('name slug price image');
  db.disconnect();
  return res.json({ok: true, products});
}

export default productsApi;
