import {
  CartState,
  ProductActions,
  ADD_PRODUCT,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  EMPTY_CART,
  REMOVE_PRODUCT,
  ProductState,
} from "../../types";

const initialState: CartState = {
  inCart: [],
};

export default function product(
  state = initialState,
  action: ProductActions
): CartState {
  switch (action.type) {
    case ADD_PRODUCT: {
      const { product } = action.payload;
      return { ...state, inCart: [...state.inCart, product] };
    }

    case REMOVE_PRODUCT: {
      const { product } = action.payload;
      const index = state.inCart.findIndex((p) => p.name === product.name);
      if (index >= 0) {
        state.inCart.splice(index, 1);
        return { ...state, inCart: [...state.inCart] };
      }
      return state;
    }
    case INCREASE_QUANTITY: {
      const productId = action.payload.product._id;
      return {
        ...state,
        inCart: state.inCart.map((product) =>
          product._id === productId && product.amountInCart < product.quantity
            ? { ...product, amountInCart: product.amountInCart + 1 }
            : product
        ),
      };
    }
    case DECREASE_QUANTITY: {
      const productId = action.payload.product._id;
      return {
        ...state,
        inCart: state.inCart.map((product) =>
          product._id === productId
            ? {
                ...product,
                amountInCart: product.amountInCart - 1,
              }
            : product
        ),
      };
    }
    default:
      return state;
  }
}
