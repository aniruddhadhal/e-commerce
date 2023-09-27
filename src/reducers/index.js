import {
  Add_products,
  Add_cart,
  Product_view,
  Cart_items,
  update_cart,
  delete_cart
} from "../actions";

const initialState = {
  products: [],
  cart: [],
  itemToDisplay: "",
  totalCart: 0
};

export default function products(state = initialState, action) { // Use 'action' instead of 'actions' as the parameter
  switch (action.type) { // Use 'action.type' to determine the action type
    case Add_products:
      return {
        ...state,
        products: action.products // Use 'action.products' to update products
      };

    case Add_cart:
      const existingCartItemIndex = state.cart.findIndex(item => item.id === action.cart.id);

      if (existingCartItemIndex !== -1) {
        // If the item is already in the cart, update its quantity
        const updatedCart = [...state.cart];
        updatedCart[existingCartItemIndex].qty += 1;
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // If the item is not in the cart, add it
        return {
          ...state,
          cart: [...state.cart, { ...action.cart, qty: 1 }],
        };
      }

    case Product_view:
      return {
        ...state,
        itemToDisplay: action.view // Use 'action.view' to set the item to display
      };

    case Cart_items:
      const total = state.cart.reduce((total, item) => total + item.qty, 0);
      return {
        ...state,
        totalCart: total,
      };

    case update_cart:
      const updatedCartItemIndex = state.cart.findIndex(item => item.id === action.updatedItem.id);
      if (updatedCartItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[updatedCartItemIndex] = action.updatedItem;
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return state; // Item not found, no changes needed
      }

    case delete_cart:
      const position = state.cart.findIndex(item => item.id === action.item.id);
      if (position !== -1) {
        const updatedCart = [...state.cart];
        updatedCart.splice(position, 1);
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return state; // Item not found, no changes needed
      }

    default:
      return state;
  }
}
