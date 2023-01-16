import { Product } from 'interfaces/products';
import AxiosAPI from 'services/AxiosAPI';
import useSWR from 'swr';

export const productSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const productGender = ['men', 'women', 'kid', 'unisex'];

const useProduct = (data?: { id?: string }) => {
  const { data: product, mutate } = useSWR(data?.id ? `` : null);

  const create = async (data: Omit<Product, '_id'>) => {
    const response = await AxiosAPI.post('/product', { ...data, handleResponse: { title: 'Creando producto' } }).catch((error) => error);
    return response.data;
  };

  const update = async (id: string, data: Omit<Product, '_id'>) => {
    const response = await AxiosAPI.put(`/product`, { id, ...data, handleResponse: { title: 'Creando producto' } }).catch((error) => error);
    return response.data;
  };
  const remove = async (id: string) => {
    const response = await AxiosAPI.delete(`/product`, { data: { id, handleResponse: { title: 'Creando producto' } } }).catch((error) => error);
    return response.data;
  };

  return {
    product,
    create,
    update,
    remove,
    refresh: mutate,
  };
};

export default useProduct;
