import React, { FC, useState } from 'react';
import styled from 'styled-components';

type ProductImagesProps = {
  images?: object[];
};

interface ProductImageValues {
  filename?: string;
  height?: number;
  id?: string;
  size?: number;
  thumbnails?: {};
  type?: string;
  url?: string;
  width?: number;
}

// images = [], because images can be undefined
// so we have to specify default values in order
// not to get the error

const ProductImages: FC<ProductImagesProps> = ({ images = [] }) => {
  const [main, setMain] = useState<ProductImageValues>(images[0]);

  return (
    <Wrapper>
      <img src={main.url} alt={main.filename} className="main" />
      <div className="gallery">
        {images.map((image: ProductImageValues, index: number) => {
          return (
            <img
              src={image.url}
              alt={image.filename}
              key={image.id}
              onClick={() => setMain(images[index])}
              className={`${image.url === main.url ? 'active' : null}`}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
