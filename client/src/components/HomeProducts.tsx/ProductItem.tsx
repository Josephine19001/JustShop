import React, { FC } from "react";

const ProductItem: FC<{ src?: string; name?: string; price?: string }> = ({
  src,
  name,
  price,
}) => {
  return (
    <div className="product-container">
      <img src={src} />
      <p>{name}</p>
      <p>{price}</p>
    </div>
  );
};

export default ProductItem;
