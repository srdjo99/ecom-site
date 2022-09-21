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

interface ISingleProductProps {
  id?: string;
  category?: string;
  colors?: string[];
  company?: string;
  image?: string;
  name?: string;
  price?: number;
  description?: string;
  shipping?: boolean;
  featured?: boolean;
}

type FilterState = {
  allProducts: ISingleProductProps[];
  filteredProducts: ISingleProductProps[];
  gridView: boolean;
  sort: string;
  filters: FiltersTypes;
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

type UpdateFiltersPayload = {
  name: string;
  value: string;
};

type FilterAction =
  | { type: 'SET_LISTVIEW' }
  | { type: 'SET_GRIDVIEW' }
  | { type: 'UPDATE_SORT'; payload: string }
  | {
      type: 'LOAD_PRODUCTS';
      payload: ISingleProductProps[];
    }
  | { type: 'SORT_PRODUCTS' }
  | { type: 'UPDATE_FILTERS'; payload: UpdateFiltersPayload }
  | { type: 'FILTER_PRODUCTS' }
  | { type: null };

const filterReducer = (state: FilterState, action: FilterAction) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const maxPriceArr = action.payload.map(
        (product) => product.price as number,
      );
      const maxPrice = Math.max(...maxPriceArr);

      return {
        ...state,
        // this way, both are equal to the prodcuts that are coming
        // from the payload, but with '...' we`re just copying the values
        // we`re NOT referencing to the same place in the memory
        filteredProducts: [...action.payload],
        allProducts: [...action.payload],
        filters: {
          ...state.filters,
          maxPrice,
          price: maxPrice,
        },
      };
    }
    case SET_GRIDVIEW:
      return {
        ...state,
        gridView: true,
      };

    case SET_LISTVIEW:
      return {
        ...state,
        gridView: false,
      };

    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    case SORT_PRODUCTS: {
      const {
        sort,
        filteredProducts,
      }: { sort: string; filteredProducts: ISingleProductProps[] } = state;
      let tempProducts = [...filteredProducts];

      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => {
          if (a.price === undefined || b.price === undefined) return 0;

          return a.price - b.price;
        });
      }

      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => {
          if (a.price === undefined || b.price === undefined) return 0;
          return b.price - a.price;
        });
      }

      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => {
          if (a.name === undefined || b.name === undefined) return 0;

          return a.name.localeCompare(b.name);
        });
      }

      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => {
          if (a.name === undefined || b.name === undefined) return 0;

          return b.name.localeCompare(a.name);
        });
      }

      return { ...state, filteredProducts: tempProducts };
    }

    case UPDATE_FILTERS: {
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    }
    case FILTER_PRODUCTS: {
      console.log('filtering products');
      return { ...state };
    }

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filterReducer;
