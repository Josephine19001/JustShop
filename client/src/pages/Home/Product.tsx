import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserLayout from "../../components/layout/UserLayout";
import { AppState } from "../../types";
import ProductComponent from "../../components/Product/Product";
import { getAllProducts } from "../../redux/actions/products";

export default function Product() {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state: AppState) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <UserLayout>
      <ProductComponent allProducts={allProducts} />
    </UserLayout>
  );
}
