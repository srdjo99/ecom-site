import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext';
import AmountButtons from './AmountButtons';

// sytnax when passing spreaded props
// interface IProductProps {
//   category: string;
//   colors: string[];
//   company: string;
//   description: string;
//   featured?: boolean;
//   id: string;
//   images: object[];
//   name: string;
//   price: number;
//   reviews: number;
//   stars: number;
//   stock: number;
// }

// syntax when passing the whole object as a prop
interface IProductProps {
  product: {
    category: string;
    colors: string[];
    company: string;
    description: string;
    featured?: boolean;
    id: string;
    images: object[];
    name: string;
    price: number;
    reviews: number;
    stars: number;
    stock: number;
  };
}

const AddToCart: FC<IProductProps> = ({ product }) => {
  const {
    name,
    category,
    colors,
    company,
    description,
    featured,
    id,
    images,
    price,
    reviews,
    stars,
    stock,
  } = product;
  return <h4>{name}</h4>;
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
