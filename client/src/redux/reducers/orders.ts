import {
  CHECKOUT_FAILURE,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
} from "../../types";

const initialState: any = {
  orders: [],
  error: "",
  loading: false,
};

export default function ordersReducer(state = initialState, action: any) {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHECKOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        allProducts: action.payload.products,
      };
    default:
      return { ...state };
  }
}
