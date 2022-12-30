import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import styles from './ProductLists.module.sass';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


type PropsType = {
  products: Product[];
};

const ProductsList: React.FC<PropsType> = ({ products }: PropsType) => {
  return (
    <div className={styles.products_container}>
      {products.map((product) => (<div key={product.id}>
        <Card variant="outlined">
          <CardHeader
            title={product.name}
            subheader='Categoria xxx'
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardMedia
            component='img'
            image={product.image}
            alt={product.name}
            height={200}
          />
          <CardContent>
            <div className={styles.description}>{product.description.slice(0, 100)}</div>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label='share'>
              <ShareIcon />
            </IconButton>
            <Box flex={1} />
            <IconButton aria-label='expand content'>
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
      ))}
    </div>
  );
};

export default ProductsList;
