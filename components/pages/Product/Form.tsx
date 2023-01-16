import AutoComplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { productGender, productSizes } from 'database/models/Product';
import { ProductCreate } from 'interfaces/products';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import useProduct from 'services/useProduct';
type PropsType = {
  id?: string;
  product?: ProductCreate;
};

const ProductForm: React.FC<PropsType> = ({ id, product }: PropsType) => {
  const { create, update } = useProduct();
  const router = useRouter();

  const { register, handleSubmit, control } = useForm({
    defaultValues: product,
  });

  const onSubmit = async (data: ProductCreate) => {
    const response = await (id ? update(id, data) : create(data));
    if (!id && response?.ok) {
      router.push(`/admin/product/${response.product._id}`);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ padding: 20 }}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            md={6}
          >
            Name (required)
            <TextField
              fullWidth
              size='small'
              type='text'
              {...register('name', { required: true })}
              defaultValue={product?.name}
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            Code
            <TextField
              fullWidth
              size='small'
              type='text'
              {...register('code')}
              defaultValue={product?.code}
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            Slug
            <TextField
              fullWidth
              size='small'
              type='text'
              {...register('slug')}
              defaultValue={product?.slug}
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            Price
            <TextField
              fullWidth
              size='small'
              type='text'
              {...register('price')}
              defaultValue={product?.price}
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            Description
            <TextField
              fullWidth
              size='small'
              type='text'
              {...register('description')}
              defaultValue={product?.description}
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            Image
            <TextField
              fullWidth
              size='small'
              type='text'
              {...register('image')}
              defaultValue={product?.image}
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            Images
            <TextField
              fullWidth
              size='small'
              type='text'
              {...register('images')}
              defaultValue={product?.images}
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            Active
            <Switch
              defaultChecked={product?.active ?? true}
              {...register('active')}
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            Stock
            <TextField
              fullWidth
              size='small'
              type='text'
              {...register('stock')}
              defaultValue={product?.stock}
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            Sizes (required)
            <Controller
              name='sizes'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <AutoComplete
                  options={productSizes}
                  fullWidth
                  size='small'
                  multiple
                  value={product?.sizes}
                  onChange={(_, values) => onChange(values)}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            Categories
            <TextField
              fullWidth
              size='small'
              type='text'
              defaultValue={product?.categories}
              {...register('categories')}
            />
          </Grid>
          <Grid
            item
            md={6}
          >
            Gender
            <Select
              fullWidth
              size='small'
              {...register('gender')}
              defaultValue={product?.gender || ''}
            >
              {productGender.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid
            item
            md={12}
          >
            <Button
              type='submit'
              variant='contained'
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProductForm;
