import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.sass';
import ShoppingCart from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import History from '@mui/icons-material/HistoryOutlined';
import VerifiedUser from '@mui/icons-material/VerifiedUserOutlined';
import LockOpen from '@mui/icons-material/LockOpenOutlined';

const Navbar: React.FC = () => {
  const [menu, setMenu] = useState<HTMLElement | null>(null);

  const handleMenu = (event: React.MouseEvent) => {
    const element = (menu ? null : event.target) as HTMLElement;
    setMenu(element);
  };

  return (
    <AppBar>
      <Toolbar>
        <h1>Test Shop</h1>
        <Box sx={{ flex: 1 }} />
        <IconButton onClick={handleMenu}>
          <MenuIcon />
        </IconButton>
        <Drawer
          open={Boolean(menu)}
          onClose={handleMenu}
          anchor='right'
          sx={{width: 300}}
        >
          <List className={styles.container}>
            <ListItem className={styles.link}><Link href='/cart'><ShoppingCart /> Cart</Link></ListItem>
            <ListItem className={styles.link}><FavoriteIcon /> Favorites</ListItem>
            <ListItem className={styles.link}><History /> Historial</ListItem>
            <Divider />
            <ListItem className={styles.link}><VerifiedUser /> Profile</ListItem>
            <ListItem className={styles.link}><LockOpen /> Login</ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
