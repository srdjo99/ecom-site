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
  let cart = localStorage.getItem('cart');
  if (cart) {
    cart = JSON.parse(cart);
    return cart;
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
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
  // isLoading: false,
  // setIsLoading: () => {},
  addToCart: () => {},
  removeItem: (id: string) => {},
  toggleAmount: (id: string, value: any) => {},
  clearCart: () => {},
};

type CartContextTypes = {
  cart: any[] | any;
  totalItems: number;
  totalAmount: number;
  shippingFee: number;
  // isLoading: boolean;
  // setIsLoading: Dispatch<SetStateAction<boolean>>;
  // addToCart: (id: any, color: any, amount: any, product: any) => void;
  addToCart: (...args: any) => void;
  removeItem: (id: string) => void;
  toggleAmount: (id: string, value: any) => void;
  clearCart: () => void;
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
  const removeItem = (id: string) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  // toggle amount
  const toggleAmount = (id: string, value: any) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

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
