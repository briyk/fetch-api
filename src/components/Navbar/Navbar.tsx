import React from 'react';
import styles from './navbar.module.scss';
import Container from '@mui/material/Container';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';


const Navbar = () => {
  const { state: cartItems } = useCart();

  // Calculate total quantity of items in cart
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Container className={styles.navbar}>
      <Link href="/" style={{padding:"10px"}}>LOGO</Link>
      <Link href="/cart">
        <span>
          <ShoppingCartIcon />
          {totalQuantity > 0 && <div className={styles.amount}>{totalQuantity}</div>}
        </span>
      </Link>
    </Container>
  );
};

export default Navbar;