import axios from "axios";
import { Dispatch } from "redux";

import {
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
  CHECKOUT_REQUEST,
} from "../../types";
import { alertSuccess, alertFailure } from "./alert";

const baseURL = "/api/v1/products";

//Checkout
export const checkoutRequest = () => {
  return {
    type: CHECKOUT_REQUEST,
  };
};
export const checkoutSuccess = () => {
  return {
    type: CHECKOUT_SUCCESS,
  };
};
export const checkoutFailure = (error: string) => {
  return {
    type: CHECKOUT_FAILURE,
    payload: {
      error,
    },
  };
};

export const checkout = (product: any) => {
  return function (dispatch: Dispatch) {
    dispatch(checkoutRequest());

    axios({
      method: "post",
      url: `${baseURL}/payment`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
      },
      data: product,
    })
      .then((response) => {
        const res = response.status;

        dispatch(checkoutSuccess());
      })
      .catch((error) => {
        dispatch(checkoutFailure(error));
      });
  };
};
