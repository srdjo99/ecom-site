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
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

const defaultFilterContextValues = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
  setGridView: () => {},
  setListView: () => {},
  updateSort: (e: any) => {},
  updateFilters: (e: any) => {},
  clearFilters: () => {},
};

type FiltersTypes = {
  text: string;
  company: string;
  category: string;
  color: string;
  minPrice: number;
  maxPrice: number;
  price: number;
  shipping: boolean;
};

interface IFilterContextType {
  filteredProducts: object[];
  allProducts: object[];
  gridView: boolean;
  sort: string;
  filters: FiltersTypes;
  setGridView: () => void;
  setListView: () => void;
  updateSort: (e: any) => void;
  updateFilters: (e: any) => void;
  clearFilters: () => void;
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

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => dispatch({ type: SET_GRIDVIEW });

  const setListView = () => dispatch({ type: SET_LISTVIEW });

  const updateSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    // for select, name does not matter, but later it will
    const { name, value } = e.target;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {};

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => useContext(FilterContext);
