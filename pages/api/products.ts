import { faker } from '@faker-js/faker';
import { NextApiRequest, NextApiResponse } from 'next';
import {v4 as id} from 'uuid';
import defaultImage from '../../public/3618013.jpg';

const generateProducts = (total: number) => {
  return Array(total).fill('').map((_) => {
    return {
      id: id(),
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(3),
      price: faker.commerce.price(1, 800, 2),
      image: defaultImage.src
    };
  })
}

const productsApi = (req: NextApiRequest, res: NextApiResponse) => {
  const total = req.query.total || 10;
  return res.status(200).json(generateProducts(Number(total)))
}

export default productsApi;
