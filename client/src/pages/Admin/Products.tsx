import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";

import { AppState } from "../../types";
import { getAllProducts } from "../../redux/actions/products";

// import Dashboard from "../../components/Dashboard/Dashboard";
import AdminLayout from "../../components/layout/AdminLayout";
import Products from "../../components/Products/Products";

const DashboardPage: FC = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state: AppState) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <AdminLayout>
      <Products allProducts={allProducts} />
    </AdminLayout>
  );
};

DashboardPage.displayName = "DashboardPage Page";

export default DashboardPage;
