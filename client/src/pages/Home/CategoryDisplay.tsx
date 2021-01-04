import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import UserLayout from "../../components/layout/UserLayout";
import { AppState } from "../../types";
import Products from "../../components/HomeProducts.tsx/index";
import { getAllProducts } from "../../redux/actions/products";

const CategoryDisplay = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state: AppState) => state.products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const { category } = useParams();
  const matched = allProducts.filter(
    (p) => p.category.toLowerCase() === category
  );

  return (
    <UserLayout>
      {matched ? (
        <Products allProducts={matched} />
      ) : (
        <p>There is no product found in this category</p>
      )}
    </UserLayout>
  );
};

export default CategoryDisplay;
