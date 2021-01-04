import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  EMPTY_CART,
  ProductActions,
  ProductState,
} from "../../types";

export function addProduct(product: ProductState): ProductActions {
  return {
    type: ADD_PRODUCT,
    payload: {
      product,
    },
  };
}
export function removeProduct(product: ProductState): ProductActions {
  return {
    type: REMOVE_PRODUCT,
    payload: {
      product,
    },
  };
}
export function increaseQuantity(product: ProductState): ProductActions {
  return {
    type: INCREASE_QUANTITY,
    payload: {
      product,
    },
  };
}
export function decreaseQuantity(product: ProductState) {
  if (product.amountInCart < 1) {
    return {
      type: REMOVE_PRODUCT,
    };
  } else {
    return {
      type: DECREASE_QUANTITY,
      payload: {
        product,
      },
    };
  }
}
export function emptyQuantity(): ProductActions {
  return {
    type: EMPTY_CART,
  };
}
