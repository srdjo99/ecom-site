import { useFilterContext } from '../context/FilterContext';
import GridView from './GridView';
import ListView from './ListView';

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

const ProductList = () => {
  const {
    filteredProducts: products,
    gridView,
  }: { filteredProducts: ISingleProductProps[]; gridView: boolean } =
    useFilterContext();

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    );
  }

  if (!gridView) {
    return <ListView products={products} />;
  }

  return <GridView products={products} />;
};

export default ProductList;
