import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { Card, CardContent, Grid } from "@material-ui/core";

import useStyles from "../ChangePassword/style";
import { AppState, ProductState } from "../../types";
import { updateProduct, getProductById } from "../../redux/actions/products";

const categories = [
  {
    value: "clothing",
    label: "clothing",
  },
  {
    value: "shoes",
    label: "shoes",
  },
  {
    value: "accessories",
    label: "accessories",
  },
];

const UpdateProduct: FC = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  const initialState: ProductState = {
    _id: "",
    name: "",
    category: "",
    sizes: "",
    variants: "",
    description: "",
    price: "",
    image: "",
    quantity: 0,
    amountInCart: 0,
  };

  const { loading, currentProduct } = useSelector(
    (state: AppState) => state.products
  );
  console.log("Current Product", currentProduct);
  const [product, setProduct] = useState(initialState);

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleUpdateProduct = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateProduct(id, product));
    window.location.reload(false);
  };

  return (
    <Grid className={classes.container} container={true} justify="center">
      <Grid item={true} xs={12} md={10} lg={6}>
        <h2>Update Product</h2>
        <Card elevation={4} raised={true} variant="elevation">
          <CardContent>
            <form>
              <TextField
                id="outlined-full-width"
                label="Name"
                style={{ margin: 8 }}
                placeholder="Name"
                helperText="Required!"
                fullWidth
                margin="normal"
                value={product.name}
                onChange={handleChange}
                name="name"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <TextField
                label="Description"
                id="outlined-full-width"
                defaultValue="Default Value"
                className={classes.textField}
                helperText="Required!"
                value={product.description}
                onChange={handleChange}
                name="description"
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-full-width"
                select
                label="Select"
                value={product.category}
                onChange={handleChange}
                name="category"
                helperText="Please select your category"
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Sizes"
                id="outlined-full-width"
                defaultValue="Default Value"
                className={classes.textField}
                helperText="Required!"
                margin="dense"
                value={product.sizes}
                onChange={handleChange}
                name="sizes"
                variant="outlined"
              />
              <TextField
                label="Variants"
                id="outlined-full-width"
                defaultValue="Default Value"
                className={classes.textField}
                helperText="Required!"
                value={product.variants}
                onChange={handleChange}
                name="variants"
                margin="normal"
                variant="outlined"
              />

              <TextField
                label="Price"
                id="outlined-full-width"
                defaultValue="Default Value"
                className={classes.textField}
                helperText="Required!"
                value={product.price}
                onChange={handleChange}
                name="price"
                margin="normal"
                variant="outlined"
              />

              <TextField
                label="Image Url"
                id="outlined-full-width"
                defaultValue="Default Value"
                className={classes.textField}
                helperText="Not Required"
                value={product.image}
                onChange={handleChange}
                name="image"
                variant="outlined"
              />
              <TextField
                label="Quantity in Stock"
                id="outlined-full-width"
                defaultValue="Default Value"
                className={classes.textField}
                helperText="Number of products in stock"
                value={product.quantity}
                onChange={handleChange}
                name="quantity"
                variant="outlined"
              />
              <Button
                className={classes.buttonColor}
                variant="contained"
                disabled={loading}
                fullWidth={true}
                onClick={handleUpdateProduct}
              >
                Update Product
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UpdateProduct;
