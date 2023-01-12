import AxiosAPI from 'services/AxiosAPI';
import useSWR from 'swr';
const useProducts = (params?: {defaultData: {ok: boolean, products: Product[]}}) => {
  const {data} = useSWR<{products: Product[]}>('/products', {fallbackData: params?.defaultData || {ok: true, products:[]}});

  return {
    data: data?.products
  }
}

export const getProducts = async() => await AxiosAPI.get('/products').then(response => response.data).catch(error => error);

export default useProducts;
