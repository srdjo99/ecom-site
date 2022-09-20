import React, { useEffect, useContext, useReducer, useState } from 'react';
import reducer from '../reducers/cartReducer';
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

const CartProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <CartContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// make sure use
export const useCartContext = () => useContext(CartContext);
