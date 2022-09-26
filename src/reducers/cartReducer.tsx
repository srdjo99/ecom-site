import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, mainColor, amount, product } = action.payload;
      const tempItem = state?.car?.find((i: any) => {
        return i.id === id + mainColor;
      });
      if (tempItem) {
        const tempCart = state?.cart?.map((cartItem: any) => {
          if (cartItem.id === id + mainColor) {
            let newAmount = cartItem + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          }
          return cartItem;
        });

        return { ...state, cart: tempCart };
      }
      const newItem = {
        id: id + mainColor,
        name: product.name,
        color: mainColor,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }

    case REMOVE_CART_ITEM: {
      const tempCart = state.cart.filter(
        (item: any) => item.id !== action.payload,
      );
      return { ...state, cart: tempCart };
    }

    case CLEAR_CART: {
      return { ...state, cart: [] };
    }

    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload;
      const tempCart = state.cart.map((item: any) => {
        if (item.id === id) {
          if (value === 'inc') {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          }
          if (value === 'dec') {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 0;
            }
            return { ...item, amount: newAmount };
          }
        }

        return item;
      });

      return { ...state, cart: tempCart };
    }

    case COUNT_CART_TOTALS: {
      const { totalItems, totalAmount } = state.cart.reduce(
        (total: any, cartItem: any) => {
          const { amount, price } = cartItem;
          // eslint-disable-next-line
          total.totalItems += amount;
          // eslint-disable-next-line
          total.totalAmount += price * amount;

          return total;
        },
        {
          totalItems: 0,
          totalAmount: 0,
        },
      );
      return { ...state, totalItems, totalAmount };
    }

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cartReducer;
