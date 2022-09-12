import React, {
  useEffect, useContext, useReducer, useState,
} from 'react';
import reducer from '../reducers/cart_reducer';
// import {
//   ADD_TO_CART,
//   REMOVE_CART_ITEM,
//   TOGGLE_CART_ITEM_AMOUNT,
//   CLEAR_CART,
//   COUNT_CART_TOTALS,
// } from "../actions";

const initialState = {};

type CartContextProps = {};

const CartContext = React.createContext<CartContextProps | null>(null);

export const CartProvider: React.FC<React.ReactNode | any> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <CartContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => useContext(CartContext);
