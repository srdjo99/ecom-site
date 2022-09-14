import React, {
  useEffect, useContext, useReducer, FC,
} from 'react';
import reducer from '../reducers/FilterReducer';
// import {
//   LOAD_PRODUCTS,
//   SET_GRIDVIEW,
//   SET_LISTVIEW,
//   UPDATE_SORT,
//   SORT_PRODUCTS,
//   UPDATE_FILTERS,
//   FILTER_PRODUCTS,
//   CLEAR_FILTERS,
// } from "../actions";
// import { useProductsContext } from "./products_context";

const initialState = {};

type FilterContextType = {};

const FilterContext = React.createContext<FilterContextType | null>(null);

export const FilterProvider: FC<React.ReactNode | any> = ({ children }) => (
  <FilterContext.Provider value="filter context">
    {children}
  </FilterContext.Provider>
);
// make sure use
export const useFilterContext = () => useContext(FilterContext);