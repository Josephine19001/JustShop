import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { IconButton, Badge } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { List, ListItem } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";

import { AppState, ProductState } from "../../types";
import {
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/actions/cart";
import useStyles from "./styles";

const Cart = () => {
  const dispatch = useDispatch();
  const { inCart } = useSelector((state: AppState) => state.cart);

  const classes = useStyles();
  const [openCart, setopenCart] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [count, setCount] = useState(0);

  const handleDraweropenCart = () => {
    setopenCart(true);
  };

  const handleDrawerCloseCart = () => {
    setopenCart(false);
  };

  const handleRemoveClick = (product: ProductState) => {
    dispatch(removeProduct(product));
  };
  const handleIncreaseQuantityClick = (product: ProductState) => {
    dispatch(increaseQuantity(product));
    setCount(count + 1);
  };
  const handleDecreaseQuantityClick = (product: ProductState) => {
    dispatch(decreaseQuantity(product));
    setCount(count - 1);
  };

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        aria-label="openCart drawer"
        edge="end"
        onClick={handleDraweropenCart}
        className={clsx(classes.menuButton, openCart && classes.hide)}
      >
        <Badge badgeContent={inCart.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={openCart}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerCloseCart}>
            <ChevronRightIcon />
          </IconButton>
          <Typography variant="h6">Your Items</Typography>
        </div>
        <Divider />
        <List>
          {inCart.map((product) => {
            console.log("quantity", product.amountInCart);
            return (
              <ListItem key={uuidv4()} className={classes.list}>
                <img
                  style={{ width: "50px", padding: "20px" }}
                  src={product.image}
                  alt={product.name}
                />
                <p style={{ fontWeight: "bolder", padding: "20px" }}>
                  {product.name}
                </p>
                <p style={{ fontWeight: "bolder", padding: "20px" }}>
                  {product.price}
                </p>
                <DeleteIcon onClick={() => handleRemoveClick(product)} />
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
        </List>
        <Divider />
        <Link
          to="/order-summary"
          style={{
            textDecorationColor: "green",
            color: "green",
            textAlign: "center",
            padding: "20px",
          }}
        >
          Proceed to Checkout
        </Link>
      </Drawer>
    </div>
  );
};

export default Cart;
