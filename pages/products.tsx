import React from 'react';
import useProducts from 'services/useProducts';

const ProductsPage: React.FC = () => {
  const { data } = useProducts();

  return (
    <>
      {data?.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </>
  );
};

export default ProductsPage;
