import {
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PENDING_DATA,
  SEARCH_PRODUCT,
} from "../../types";
import { ProductsInitialState } from "../../types";

const initialState: ProductsInitialState = {
  allProducts: [],
  error: "",
  loading: false,
  currentProduct: {},
  // searchProduct: "",
};

const productReducer = function (
  state = initialState,
  action: any
): ProductsInitialState {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
    case CREATE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
    case GET_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PRODUCTS_FAILURE:
    case CREATE_PRODUCT_FAILURE:
    case DELETE_PRODUCT_FAILURE:
    case GET_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        allProducts: [
          ...state.allProducts.filter(
            (product) => product._id !== action.payload._id
          ),
          action.payload,
        ],
        currentProduct: action.payload,
      };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentProduct: action.payload,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
    case CREATE_PRODUCT_SUCCESS:
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        allProducts: action.payload.products,
      };
    case SEARCH_PRODUCT:
      const { search } = action.payload;
      return {
        ...state,
        // searchProduct: search,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        allProducts: state.allProducts.filter((p) => p._id !== action.payload),
      };
    case GET_PENDING_DATA:
      return { ...state };

    default:
      return { ...state };
  }
};

export default productReducer;
