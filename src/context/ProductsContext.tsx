import axios from 'axios';
import React, { FC, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/ProductsReducer';
import { productsUrl as url } from '../utils/constants';
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
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: null,
  singleProductLoading: false,
  singleProductError: false,
  singleProduct: undefined,
};

// type ChildrenProps = {
//   children: React.ReactNode;
// };

const defaultContextValues = {
  isSidebarOpen: false,
  productsError: false,
  productsLoading: false,
  productsFeatured: undefined,
  singleProductLoading: false,
  singleProductError: false,
  singleProduct: undefined,
  openSidebar: () => {},
  closeSidebar: () => {},
  fetchSingleProduct: (url: string) => {},
};

interface IProductsValues {
  category: string;
  colors: string[];
  description: string;
  id: string;
  image: string;
  price: number;
  shipping: boolean;
  featured?: boolean;
}

interface ISingleProductValues extends IProductsValues {
  company: string;
  images: object[];
  name: string;
  reviews: number;
  shipping: boolean;
  stars: number;
  stock: number;
}

interface IProductsContextProps {
  isSidebarOpen: boolean;
  productsError: boolean;
  productsLoading: boolean;
  productsFeatured?: any;
  singleProductLoading: boolean;
  singleProductError: boolean;
  singleProduct?: ISingleProductValues;
  openSidebar: () => void;
  closeSidebar: () => void;
  fetchSingleProduct: (url: string) => void;
}

const ProductsContext =
  React.createContext<IProductsContextProps>(defaultContextValues);

export const ProductsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchProducts = async (url: string) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios(url);
      const products = response.data;

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (url: string) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios(url);
      const singleProduct = response.data;

      console.log(singleProduct);

      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        closeSidebar,
        openSidebar,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => useContext(ProductsContext);
