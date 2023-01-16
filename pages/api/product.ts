import db from 'database/db';
import Product from 'database/models/Product';
import { ProductCreate } from 'interfaces/products';
import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const createSlug = ({ code, slug, name }: { code?: string; slug?: string; name: string }) =>
  slug
    ? slug
    : ((code || 0) + '-' + name)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replaceAll(' ', '-')
        .replace('--', '-');

const productApi = async (req: NextApiRequest, res: NextApiResponse) => {
  db.connect();
  if (req.method === 'GET') {
    const { id } = req.query;
    if (!isValidObjectId(id)) return res.status(503).json({ ok: false, message: 'Invalid ID' });
    db.connect();
    const product = await Product.findById(id);
    db.disconnect();
    if (product) {
      return res.json({ ok: true, product });
    }
    return res.json({ ok: false, message: 'Product not found' });
  }

  if (req.method === 'POST') {
    const { code, name, slug: slugRaw, price, description, image, images, available, stock, sizes, categories, gender } = req.body as ProductCreate;

    if (!name) return res.status(201).json({ ok: false, message: 'Name is missing' });
    if (!sizes) return res.status(201).json({ ok: false, message: 'Sizes is missing' });

    const slug = createSlug({ code, slug: slugRaw, name });

    const check = await Product.findOne({ slug });
    if (check) {
      return res.json({ ok: false, message: 'Producto existente' });
    }

    const product = new Product({
      code: code || undefined,
      name: name || undefined,
      slug: slug || undefined,
      price: price || undefined,
      description: description || undefined,
      image: image || undefined,
      images: images || undefined,
      available: available || undefined,
      stock: stock || undefined,
      sizes: sizes || undefined,
      categories: categories || undefined,
      gender: gender || undefined,
    });

    try {
      await product.save();
      return res.status(200).json({ ok: true, product });
    } catch (error) {
      return res.status(502).json(error);
    }
  }

  if (req.method === 'PUT') {
    const { id, ...data } = req.body as ProductCreate & { id: string };

    const validateID = isValidObjectId(id);
    if (!validateID) return res.status(404).json({ ok: false, message: 'Product not found' });

    const validateProduct = await Product.findById(id);
    if (!validateProduct) return res.status(404).json({ ok: false, message: 'Product not found' });

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    return res.status(200).json({ ok: true, product });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!isValidObjectId(id)) return res.status(503).json({ ok: false, message: 'Invalid ID' });

    const remove = await Product.deleteOne({ _id: id }, {});
    if (!remove.deletedCount) return res.status(200).json({ ok: false, message: 'Product not found' });

    return res.status(200).json({ ok: true, message: 'Product was removed' });
  }
  return res.status(404).json({ ok: false, message: 'Invalid method' });
};

export default productApi;
