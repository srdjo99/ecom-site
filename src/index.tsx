import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import { ProductsProvider } from './context/ProductsContext';
import { FilterProvider } from './context/FilterContext';
import CartProvider from './context/CartContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
