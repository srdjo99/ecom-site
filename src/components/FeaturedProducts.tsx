import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useProductsContext } from '../context/ProductsContext';

import Error from './Error';
import Loading from './Loading';
import Product from './Product';

interface IFeaturedProductsValues {
  category: string;
  colors: [];
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  shipping: boolean;
  featured: boolean;
}

interface IFeaturedProducts {
  productsLoading: boolean;
  productsError: boolean;
  featuredProducts?: IFeaturedProductsValues[];
}

const FeaturedProducts: FC = () => {
  const {
    productsLoading: loading,
    productsError: error,
    featuredProducts: featured,
  }: IFeaturedProducts = useProductsContext();

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products </h2>
        <div className="underline" />
      </div>
      <div className="section-center featured">
        {featured?.slice(0, 3).map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
