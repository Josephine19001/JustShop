import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import UpdateProduct from "../../components/UpdateProduct/UpdateProduct";
import { AppState, ProductState } from "../../types";
import {
  updateProduct,
  getAllProducts,
  getProductById,
} from "../../redux/actions/products";

export default function UpdateProductPage() {
  return (
    <AdminLayout>
      <UpdateProduct />
    </AdminLayout>
  );
}
