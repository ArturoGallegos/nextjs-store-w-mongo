import { GetStaticProps } from 'next';
import React from 'react';
import useProducts, { getProducts } from 'services/useProducts';
import LayoutStore from './../layout/StoreLayout';

type PropsType = {
  defaultData: {
    ok: boolean,
    products: Product[]
  }
}

const ProductsPage: React.FC<PropsType> = ({defaultData}) => {
  const { data } = useProducts({defaultData});
  console.log({data})

  return (
    <LayoutStore title='Productos' description='Los principales productos'>
      {data?.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </LayoutStore>
  );
};

export const getStaticProps: GetStaticProps = async() => {
  const data = await getProducts();
  return {
    props: {
      defaultData: data.ok ? data : {}
    },
  }
}

export default ProductsPage;
