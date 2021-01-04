import axios from "axios";
import { Dispatch } from "redux";

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
  FILTER_PRODUCT_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  ProductActions,
  ProductState,
} from "../../types";
import { alertFailure, alertSuccess } from "./alert";

const baseURL = "/api/v1/products";

//Get all product action creators
export const getAllProductsRequest = (): ProductActions => {
  return {
    type: GET_ALL_PRODUCTS_REQUEST,
  };
};
export const getAllProductsSuccess = (
  products: ProductState[]
): ProductActions => {
  return {
    type: GET_ALL_PRODUCTS_SUCCESS,
    payload: {
      products,
    },
  };
};
export const getAllProductsFailure = (error: string): ProductActions => {
  return {
    type: GET_ALL_PRODUCTS_FAILURE,
    payload: {
      error,
    },
  };
};

export const getAllProducts = () => {
  return function (dispatch: Dispatch) {
    dispatch(getAllProductsRequest());

    axios({
      method: "get",
      url: baseURL,
    })
      .then((response) => {
        const products = response.data;
        dispatch(getAllProductsSuccess(products));
      })
      .catch((error) => {
        dispatch(getAllProductsFailure(error));
      });
  };
};

//Create product action creators
export const createProductRequest = () => {
  return {
    type: CREATE_PRODUCT_REQUEST,
  };
};
export const createProductSuccess = (product: ProductState) => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload: {
      product,
    },
  };
};
export const createProductFailure = (error: string) => {
  return {
    type: CREATE_PRODUCT_FAILURE,
    payload: {
      error,
    },
  };
};
export const createProduct = (product: ProductState) => {
  return function (dispatch: Dispatch) {
    dispatch(createProductRequest());

    axios({
      method: "post",
      url: baseURL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
      data: product,
    })
      .then((response) => {
        const res = response.data;
        dispatch(createProductSuccess(res));
        dispatch(alertSuccess("Product created successful"));
      })
      .catch((error) => {
        dispatch(createProductFailure(error.response.data.message));
        dispatch(alertFailure(error.response.data.message));
      });
  };
};

//delete Product actions
export const deleteProductRequest = () => {
  return {
    type: DELETE_PRODUCT_REQUEST,
  };
};
export const deleteProductSuccess = (id: string) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: {
      id,
    },
  };
};
export const deleteProductFailure = (error: string) => {
  return {
    type: DELETE_PRODUCT_FAILURE,
    payload: {
      error,
    },
  };
};

export const deleteProduct = (id: string, history: any) => {
  return function (dispatch: Dispatch) {
    dispatch(deleteProductRequest());

    axios({
      method: "delete",
      url: `${baseURL}/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
      data: id,
    })
      .then((response) => {
        const res = response.data;

        dispatch(deleteProductSuccess(res));
        dispatch(alertSuccess("Product deleted"));
        history.push("/dashboard/products");
      })
      .catch((error) => {
        dispatch(deleteProductFailure(error));
      });
  };
};

//update Product actions
export const updateProductRequest = () => {
  return {
    type: UPDATE_PRODUCT_REQUEST,
  };
};
export const updateProductSuccess = (id: string) => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: {
      id,
    },
  };
};
export const updateProductFailure = (error: string) => {
  return {
    type: UPDATE_PRODUCT_FAILURE,
    payload: {
      error,
    },
  };
};

export const updateProduct = (
  productId: string,
  product: Partial<ProductState>
) => {
  return function (dispatch: Dispatch) {
    dispatch(updateProductRequest());

    axios({
      method: "put",
      url: `${baseURL}/${productId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
      data: product,
    })
      .then((response) => {
        const product = response.data;
        dispatch(updateProductSuccess(product));
        dispatch(alertSuccess("Product successfully updated"));
      })
      .catch((error) => {
        dispatch(updateProductFailure(error.response.data.message));
      });
  };
};
//find Product action
export const getProductByIdRequest = () => {
  return {
    type: GET_PRODUCT_BY_ID_REQUEST,
  };
};
export const getProductByIdSuccess = (id: string) => {
  return {
    type: GET_PRODUCT_BY_ID_SUCCESS,
    payload: {
      id,
    },
  };
};
export const getProductByIdFailure = (error: string) => {
  return {
    type: GET_PRODUCT_BY_ID_FAILURE,
    payload: {
      error,
    },
  };
};

export const getProductById = (id: string) => {
  return function (dispatch: Dispatch) {
    dispatch(getProductByIdRequest());

    axios({
      method: "get",
      url: `${baseURL}/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
      data: id,
    })
      .then((response) => {
        const res = response.data;

        dispatch(getProductByIdSuccess(res));
      })
      .catch((error) => {
        dispatch(getProductByIdFailure(error));
      });
  };
};

//Search product action creators
// export const searchProductRequest = () => {
//   return {
//     type: SEARCH_PRODUCT_REQUEST,
//   };
// };
// export const searchProductSuccess = (search: string) => {

//   return {
//     type: SEARCH_PRODUCT_SUCCESS,
//     payload: {
//       search,
//     },
//   };
// };
// export const searchProductFailure = (error: string) => {
//   return {
//     type: SEARCH_PRODUCT_FAILURE,
//     payload: {
//       error,
//     },
//   };
// };

// export const searchProduct = (search: string) => {
//   return function (dispatch: Dispatch) {
//     dispatch(searchProductRequest());

//     axios({
//       method: "post",
//       url: "/api/v1/products",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
//       },
//       data: product,
//     })
//       .then((response) => {
//         const res = response.data;
//         dispatch(createProductSuccess(res));
//       })
//       .catch((error) => {
//         dispatch(createProductFailure(error));
//         console.log("Error created:", error);
//       });
//   };
// };
