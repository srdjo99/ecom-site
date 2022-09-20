import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

type FilterState = {
  allProducts?: object[];
  filteredProducts?: object[];
  gridView: boolean;
};

type FilterAction = {
  type: 'LOAD_PRODUCTS';
  payload: object[];
};

const filterReducer = (state: FilterState, action: FilterAction) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      // this way, both are equal to the prodcuts that are coming
      // from the payload, but with '...' we`re just copying the values
      // we`re NOT referencing to the same place in the memory
      filteredProducts: [...action.payload],
      allProducts: [...action.payload],
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filterReducer;
