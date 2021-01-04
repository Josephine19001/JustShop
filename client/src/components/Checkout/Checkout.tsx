import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, List, ListItem, Typography, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { v4 as uuidv4 } from "uuid";

import useStyles from "../Cart/styles";
import { AppState, ProductState } from "../../types";
import {
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/actions/cart";
import CheckOutForm from "./CheckoutForm";

export const Checkout = () => {
  const dispatch = useDispatch();
  const { inCart } = useSelector((state: AppState) => state.cart);
  const handleRemoveClick = (product: ProductState) => {
    dispatch(removeProduct(product));
  };

  let sum = 0;
  let arr: any = [];
  let prod = {};

  const classes = useStyles();

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Order Summary</h2>
      {/* <Container> */}
      <Paper
        elevation={0}
        variant="outlined"
        style={{ padding: "10px", margin: "20px 200px" }}
      >
        <List>
          {inCart.map((product) => {
            return (
              <ListItem
                key={uuidv4()}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "40px",
                }}
              >
                <img
                  style={{ width: "100px" }}
                  src={product.image}
                  alt={product.name}
                />
                <p style={{ fontWeight: "bolder", padding: "30px" }}>
                  {product.name}
                </p>
                <p style={{ fontWeight: "bolder", padding: "30px" }}>
                  {product.price}
                </p>
                <DeleteIcon
                  style={{ color: "red", padding: "80px" }}
                  onClick={() => handleRemoveClick(product)}
                />
                {/* 
                <div>
                  <AddIcon
                    onClick={() => handleIncreaseQuantityClick(product)}
                  />
                  <span> {product.amountInCart}</span>
                  <RemoveIcon
                    onClick={() => handleDecreaseQuantityClick(product)}
                  />
                </div> */}
              </ListItem>
            );
          })}
          {inCart.map((pro) => {
            arr.push(pro.price.replace(/^\D+/g, ""));
            prod = { ...pro, price: Number(pro.price.replace(/^\D+/g, "")) };
            sum = arr.reduce((a: string, b: string) => {
              return (sum = Number(a) + Number(b));
            });
          })}
          <Typography
            style={{ color: "#79d70f", textAlign: "center", fontSize: "30px" }}
          >
            <span style={{ color: "black" }}>Total:</span> {` $${sum}`}
          </Typography>
        </List>
        <div className={classes.btn}>
          <CheckOutForm product={prod} />
          <Button variant="contained" className={classes.button}>
            CONTINUE TO CHECKOUT
          </Button>
        </div>
      </Paper>
    </div>
  );
};
export default Checkout;
