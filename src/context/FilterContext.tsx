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
  gridView: true,
};

const defaultFilterContextValues = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  setGridView: () => {},
  setListView: () => {},
};

interface IFilterContextType {
  filteredProducts: object[];
  allProducts: object[];
  gridView: boolean;
  setGridView: () => void;
  setListView: () => void;
}

const FilterContext = React.createContext<IFilterContextType>(
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

  const setGridView = () => dispatch({ type: SET_GRIDVIEW });

  const setListView = () => dispatch({ type: SET_LISTVIEW });

  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView }}>
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => useContext(FilterContext);
