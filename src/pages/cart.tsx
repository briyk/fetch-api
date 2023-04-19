import { useCart } from "@/context/CartContext";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import styles from '../styles/Cart.module.scss'

function Cart() {
  const { dispatch , state:products } = useCart();
  
  console.log(products)
  const total = products.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  return (
    <Container maxWidth="md" style={{margin:"30px 0"}}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {products.length === 0 ? (
        <Typography variant="subtitle1">Your cart is empty</Typography>
      ) : (
        <>
          <Box className={styles.cartHeader}>
            <Typography variant="subtitle1">Product</Typography>
            <Typography variant="subtitle1">Price</Typography>
            <Typography variant="subtitle1">Quantity</Typography>
            <Typography variant="subtitle1">Total</Typography>
          </Box>
          {products.map((item) => (
            <Box key={item.id} className={styles.cartItem}>
              <Box className={styles.itemImage}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                />
              </Box>
              <Typography variant="subtitle1">{item.name}</Typography>
              <Typography variant="subtitle1">{`$${item.price.toFixed(
                2
              )}`}</Typography>
              <Box className={styles.quantity}>
                <IconButton
                  aria-label="remove"
                  onClick={() => dispatch({ type: "DECREASE", payload: item })}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="subtitle1">{item.quantity}</Typography>
                <IconButton
                  aria-label="add"
                  onClick={() => dispatch({ type: "INCREASE", payload: item })}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Typography variant="subtitle1">{`$${(
                item.price * item.quantity
              ).toFixed(2)}`}</Typography>
              <IconButton
                aria-label="delete"
                onClick={() => dispatch({ type: "REMOVE", payload: item })}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Box className={styles.total}>
            <Typography variant="h5">{`Total: $${total.toFixed(
              2
            )}`}</Typography>
            <Button variant="contained" color="primary">
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Cart;
