import { Box, Drawer, Toolbar } from '@mui/material';
import Navbar from 'layout/components/Navbar/Navbar';
import Head from 'next/head';
import React from 'react';

type PropsType = {
  title: string;
  description?: string;
  children?: JSX.Element | JSX.Element[];
};

const LayoutStore: React.FC<PropsType> = ({ children, title, description }: PropsType) => {
  return (
    <>
      <Head>
        <title>{title || 'NextJS Store'}</title>
        {description && (
          <meta
            name='description'
            content={description}
          />
        )}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Drawer variant='permanent' sx={{backdropFilter: 'blur(4px)'}} anchor='left' open>
<Box>Hola mundo</Box>
      </Drawer>
      <Navbar />
      <Box component='main'>
        <Toolbar />
        {children}
      </Box>
    </>
  );
};

export default LayoutStore;
