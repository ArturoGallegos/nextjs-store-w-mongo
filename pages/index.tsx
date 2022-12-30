import ProductsList from 'components/Products/ProductLists/ProductLists';
import { useEffect, useState } from 'react';
import products from 'store/actions/products';
import StoreLayout from '../layout/StoreLayout';

export default function Home() {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    products.getProducts().then((data) => setProductsData(data));
  }, []);

  return (
    <StoreLayout title='Home page'>
      <ProductsList products={productsData} />
    </StoreLayout>
  );
}
