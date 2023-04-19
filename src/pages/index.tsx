import { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container , Grid } from '@mui/material';
import styles from '../styles/Home.module.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  title: string;
  quantity: number; // make quantity required with default value of 1
}


interface Props {
  products: Product[];
}

const Homepage: NextPage<Props> = ({ products }) => {
  const { dispatch , state } = useCart();
  return (
    <Container className={styles.home}>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img src={product.image} alt={product.title} />
            <h6>{product.category}</h6>
            <h2>{product.title}</h2>
            <div className={styles.cart}>
              <p>${product.price.toFixed(2)}</p>
              <AddShoppingCartIcon onClick={() => dispatch({ type: "ADD", payload: product })}/>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Homepage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await axios.get('https://fakestoreapi.com/products');
  const products = res.data;

  return {
    props: {
      products,
    },
  };
};

/*
Type 'Product' is not assignable to type 'Item'.
  Types of property 'quantity' are incompatible.
    Type 'number | undefined' is not assignable to type 'number'.
      Type 'undefined' is not assignable to type 'number'.
*/