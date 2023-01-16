import ProductForm from 'components/pages/Product/Form';
import { ProductCreate } from 'interfaces/products';
import { GetServerSideProps } from 'next';
import React from 'react';
import AxiosAPI from 'services/AxiosAPI';

type PropsType = {
  id: string;
  product: ProductCreate;
};

const ProductPage: React.FC<PropsType> = ({ id, product }: PropsType) => {
  return (
    <ProductForm
      id={id}
      product={product}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, ...rest }) => {
  const { params } = rest;
  const response = params?.id ? await AxiosAPI.get('/product', { params: { id: params?.id } }).catch((error) => error) : null;
  if (!response?.data?.ok) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      id: response.data.product._id,
      product: response.data.product,
    },
  };
};

export default ProductPage;
