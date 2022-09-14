import axios from 'axios';
import React, {
  FC, useContext, useEffect, useReducer,
} from 'react';
import reducer from '../reducers/ProductsReducer';
import { products_url as url } from '../utils/constants';
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

const initialState = {
  isSidebarOpen: false,
};

// type ChildrenProps = {
//   children: React.ReactNode;
// };

interface IProductsContextProps {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const ProductsContext = React.createContext<IProductsContextProps>({
  isSidebarOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
});

export const ProductsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('dev branc22h');

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  console.log(children);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        closeSidebar,
        openSidebar,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => useContext(ProductsContext);
