import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PageHero } from '../components';
// extra imports
// import { useCartContext } from "../context/cart_context";

const CheckoutPage = () => (
  <main>
    <PageHero title="checkout" />
    <Wrapper className="page">
      <h1>checkout here</h1>
    </Wrapper>
  </main>
);
const Wrapper = styled.div``;
export default CheckoutPage;
