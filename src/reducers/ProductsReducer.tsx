import { FaLastfmSquare } from 'react-icons/fa';
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

interface IProductsValues {
  category: string;
  colors: [];
  description: string;
  id: string;
  image: string;
  price: number;
  shipping: boolean;
  featured?: boolean;
}

interface ISingleProductValues extends IProductsValues {
  company: string;
  images: [];
  name: string;
  reviews: number;
  shipping: boolean;
  stars: number;
  stock: number;
}

type ProductsState = {
  isSidebarOpen: boolean;
  productsLoading: boolean;
  productsError: boolean;
  singleProductLoading: boolean;
  singleProductError: boolean;
  singleProduct: {};
};

type ProductsAction = {
  type: string;
  // payload?: IProductsValues[] | ISingleProductValues;
  payload?: any;
};

const ProductsReducer = (state: ProductsState, action: ProductsAction) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }

  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }

  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, productsLoading: true };
  }

  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featuredProducts = action.payload?.filter(
      (product: IProductsValues) => product.featured === true,
    );

    return {
      ...state,
      productsLoading: false,
      products: action.payload,
      featuredProducts,
    };
  }

  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, productsLoading: false, productsError: true };
  }

  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return { ...state, singleProductLoading: true, singleProductError: false };
  }

  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    console.log(`${action.payload}cedocedo`);

    return {
      ...state,
      singleProductLoading: false,
      singleProduct: action.payload,
    };
  }

  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return { ...state, singleProductLoading: false, singleProductError: true };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default ProductsReducer;
