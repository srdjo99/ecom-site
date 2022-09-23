import { FC } from 'react';
import styled from 'styled-components';
import Product from './Product';

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

const GridView = ({ products }: { products: ISingleProductProps[] }) => (
  <Wrapper>
    <div className="products-container">
      {products.map((product) => {
        return <Product key={product.id} {...product} />;
      })}
    </div>
  </Wrapper>
);

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default GridView;
