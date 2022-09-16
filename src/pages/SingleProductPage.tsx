import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { useProductsContext } from '../context/ProductsContext';
import { singleProductUrl as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components/index';

type ProductTypes = {
  name?: string;
  price?: number;
  description?: string;
  stock?: number;
  stars?: number;
  reviews?: number;
  id?: string;
  company?: string;
  images?: object[];
};

const SingleProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    singleProductLoading: loading,
    singleProductError: error,
    singleProduct: product,
    fetchSingleProduct,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);

  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       navigate('/');
  //     }, 3000);
  //   }
  // }, [error]);

  // if (error) return <Error />;
  // if (loading) return <Loading />;

  if (product) {
    const {
      name,
      price,
      description,
      stock,
      stars,
      reviews,
      id: sku,
      company,
      images,
    }: ProductTypes = product;

    return (
      <Wrapper>
        <PageHero title={name} product />
        <div className="section section-center page">
          <Link to="/products" className="btn">
            back to products
          </Link>
          <div className="product-center">
            <ProductImages images={images} />
            <div className="content">
              <h2>{name}</h2>
              <Stars stars={stars} reviews={reviews} />
              <h5 className="price">{formatPrice(price)}</h5>
              <p className="desc">{description}</p>
              <p className="info">
                <span>Available : </span>
                {stock > 0 ? 'In stock' : 'out of stock'}
              </p>
              <p className="info">
                <span>SKU : </span>
                {sku}
              </p>
              <p className="info">
                <span>Brand : </span>
                {company}
              </p>
              <hr />
              {stock > 0 && <AddToCart />}
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // const { name } = product;
  // console.log(name);

  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
    </>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
