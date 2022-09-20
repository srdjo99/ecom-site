import React, { useEffect, useContext, useReducer, FC } from 'react';

import reducer from '../reducers/filterReducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './ProductsContext';

const initialState = {
  filteredProducts: [],
  allProducts: [],
};

const defaultFilterContextValues = {
  filteredProducts: [],
  allProducts: [],
};

type FilterContextType = {
  filteredProducts: object[];
  allProducts: object[];
};

const FilterContext = React.createContext<FilterContextType>(
  defaultFilterContextValues,
);

export const FilterProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { products } = useProductsContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (products) {
      dispatch({ type: LOAD_PRODUCTS, payload: products });
    }
  }, [products]);

  return (
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => useContext(FilterContext);
