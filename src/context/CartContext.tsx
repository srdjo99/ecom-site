import React, {
  useEffect,
  useContext,
  useReducer,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import reducer from '../reducers/cartReducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions';

const getLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.stringify(localStorage.getItem('cart'));
  }
  return [];
};

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
};

const defaultContextValues = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
  // isLoading: false,
  // setIsLoading: () => {},
  addToCart: () => {},
};

type CartContextTypes = {
  cart: any[];
  totalItems?: number;
  totalAmount?: number;
  shippingFee?: number;
  // isLoading: boolean;
  // setIsLoading: Dispatch<SetStateAction<boolean>>;
  // addToCart: (id: any, color: any, amount: any, product: any) => void;
  addToCart: (...args: any) => void;
};

type AddToCartTypes = {
  id: string;
  mainColor: string | any;
  amount: number;
  product: any;
};

const CartContext = React.createContext<CartContextTypes>(defaultContextValues);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const [isLoading, setIsLoading] = useState(false);

  // add to cart
  const addToCart = (...args: any[]) => {
    // TS docs - Rest parameters
    const [id, mainColor, amount, product] = args;

    dispatch({
      type: ADD_TO_CART,
      payload: { id, mainColor, amount, product },
    });
  };

  // remove item
  const removeItem = (id: string) => {};

  // toggle amount
  const toggleAmount = (id: string, value: any) => {};

  // clear cart
  const clearCart = () => {};

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// make sure use
export const useCartContext = () => useContext(CartContext);
