import { createContext, useReducer, ReactNode, useContext } from "react";

interface Item {
  id: number;
  quantity: number;
  price: number;
  image:string ;
  name:string;

}

interface CartState extends Array<Item> {}

interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  total: number;
}

interface CartAction {
  type: string;
  payload: Item;
}

export const CartContext = createContext<CartContextProps>({
  state: [],
  dispatch: () => null,
  total: 0
});

const reducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD": {
      const item = action.payload;
      const existingItem = state.find((i) => i.id === item.id);
      if (existingItem) {
        // If item already exists in cart, update its quantity
        existingItem.quantity += 1;
        return [...state];
      } else {
        // Otherwise, add the new item to the cart
        return [...state, { ...item, quantity: 1 }];
      }
    }
    case "INCREASE": {
      const tempstate1 = state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      return tempstate1;
    }
    case "DECREASE": {
      const tempstate2 = state.map((item) => {
        if (item.id === action.payload.id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
      return tempstate2;
    }
    case "REMOVE": {
      const tempstate3 = state.filter(
        (item) => item.id !== action.payload.id
      );
      return tempstate3;
    }
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

export function useCart(){
  return useContext(CartContext)
}

export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, []);

  const total = state.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const value = { state, dispatch, total };
  
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};
