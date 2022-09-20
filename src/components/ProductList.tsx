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
  }: { filteredProducts: ISingleProductProps[] } = useFilterContext();

  return <GridView products={products} />;
};

export default ProductList;
