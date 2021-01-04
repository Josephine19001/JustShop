import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ButtonMaterial from "@material-ui/core/Button";

import { ProductState } from "../../types";
import { addProduct } from "../../redux/actions/cart";
import Button from "../shared/Button";
import "./styles.css";

const Product: FC<{ allProducts: ProductState[] }> = ({ allProducts }) => {
  const dispatch = useDispatch();

  const { name } = useParams();

  const nameSearch = allProducts.filter((p: { name: string }) =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  const handleAddClick = (product: ProductState) => {
    dispatch(addProduct(product));
  };

  useEffect(() => {}, [dispatch]);
  return (
    <div className="product">
      {nameSearch.map((product) => {
        return (
          <div className="product-item">
            <img src={product.image} className="product-item-left" />
            <div className="product-item-right">
              <h2>{product.name}</h2>
              <h3>{product.price}</h3>
              <div>
                <h4>{product.variants}</h4>

                <div className="variants">
                  {product.variants.split(" ").map((color) => {
                    return (
                      <div
                        className="color-circle"
                        style={{
                          backgroundColor: `${color.replace(",", "")}`,
                        }}
                      >
                        <span>C</span>
                      </div>
                    );
                  })}
                </div>
                <img src={product.image} />
              </div>
              <p>{product.description}</p>
              <p>
                <span>Category:</span> {product.category}
              </p>
              <p>
                <span>Sizes:</span> {`${product.sizes} `}
              </p>
              {product.quantity > 1 ? (
                <p style={{ color: "green" }}>In Stock</p>
              ) : (
                <p style={{ color: "red" }}>Out of Stock</p>
              )}
              <Button
                onClick={() => handleAddClick(product)}
                labelName={"ADD TO CART"}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
