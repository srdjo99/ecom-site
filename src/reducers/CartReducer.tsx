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
      const tempItem = state.cart.find((i: any) => {
        console.log(i);
        return i.id === id + mainColor;
      });
      if (tempItem) {
        const tempCart = state.cart.map((cartItem: any) => {
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
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cartReducer;
