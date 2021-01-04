import React, { FC } from "react";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import ProductItem from "./ProductItem";
import { ProductState } from "../../types";

const index: FC<{ allProducts: ProductState[] }> = ({ allProducts }) => {
  // const { category } = useParams();
  return (
    <div className="product-section">
      {allProducts.map((product) => {
        return (
          <Link
            style={{ textDecorationLine: "none", color: "black" }}
            to={`/product/${product.name}`}
          >
            <ProductItem
              src={product.image}
              name={product.name}
              price={product.price}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default index;
