import { Button } from '@mui/material';
import { Product } from 'interfaces/products';
import React from 'react';
import useProduct from 'services/useProduct';
import useProducts from 'services/useProducts';

type PropsType = {};

const ProductsPage: React.FC<PropsType> = ({}: PropsType) => {
  const { data: products, refresh } = useProducts();
  const { remove } = useProduct();

  const handleRemove = async (product: Product) => {
    const response = await remove(product._id);
    if (response?.ok) refresh();
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Available</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.available ? 'Yes' : 'No'}</td>
              <td>
                <Button
                  variant='contained'
                  href={`/admin/product/${product._id}`}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => handleRemove(product)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductsPage;
