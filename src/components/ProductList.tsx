import React from 'react';
import { useFilterContext } from '../context/FilterContext';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { filteredProducts: products, allProducts } = useFilterContext();

  return <GridView products={products} />;
};

export default ProductList;
