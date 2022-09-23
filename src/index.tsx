import React from 'react';
import ReactDOM from 'react-dom';

import { Auth0Provider } from '@auth0/auth0-react';

import './index.css';
import App from './App';
import { ProductsProvider } from './context/ProductsContext';
import { FilterProvider } from './context/FilterContext';
import CartProvider from './context/CartContext';
import { UserProvider } from './context/UserContext';

ReactDOM.render(
  <React.StrictMode>
    {/* <Router> */}
    <Auth0Provider
      domain={`${process.env.REACT_APP_STORE_DOMAIN}`}
      clientId={`${process.env.REACT_APP_STORE_CLIENT_ID}`}
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <UserProvider>
        <ProductsProvider>
          <FilterProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FilterProvider>
        </ProductsProvider>
      </UserProvider>
    </Auth0Provider>
    {/* </Router> */}
  </React.StrictMode>,
  document.getElementById('root'),
);
