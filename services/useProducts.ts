import useSWR from 'swr';
const useProducts = () => {
  const {data} = useSWR<{products: Product[]}>('/products', {fallbackData: {products: []}});

  return {
    data: data?.products
  }
}

export default useProducts;
