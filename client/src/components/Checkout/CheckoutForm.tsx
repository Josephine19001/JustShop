import React, { useState, FC } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { CardElement, injectStripe } from "react-stripe-elements";
import StripeCheckout from "react-stripe-checkout";
import { Paper, List, ListItem, Typography, Button } from "@material-ui/core";

import { AppState } from "../../types";
import { checkout } from "../../redux/actions/orders";
import useStyles from "../Cart/styles";

const CheckoutForm: FC<{ product: any }> = ({ product }) => {
  const dispatch = useDispatch();
  // const { inCart } = useSelector((state: AppState) => state.cart);

  // const product: any = inCart.map((p) => p);

  console.log("price:", typeof product.price);

  const makePayment = (token: any) => {
    const body = {
      token,
      product,
    };
    dispatch(checkout(body));
  };
  const classes = useStyles();
  return (
    // <Button variant="contained" className={classes.button}>
    <StripeCheckout
      stripeKey="pk_test_51HAAwpIpwx3n6aNYgmUsFysWa4OFLuvw4lJxG7YOwGllQttXr0YDYysXl62eBORttm1dCyIoIRRO3ROfKEWSCDFt009nA0J3Uu"
      token={makePayment}
      amount={product.price * 100}
      name="Checkout"
    />
    // </Button>
  );
};

export default CheckoutForm;

// const [product, setProduct] = useState({
//   name: "Trying",
//   price: 10,
//   productBy: "josephine",
// });
// const makePayment = (token: any) => {
//   const body = {
//     token,
//     product,
//   };
//   const headers = {
//     "Content-Type": "application/json",
//   };
//   return axios({ method: "post", url: "/products/payment", data: body }).then(
//     (response) => {
//       console.log("RESPONSE", response);
//       const { status } = response;
//       console.log("STATUS", status);
//     }
//   );
// };
