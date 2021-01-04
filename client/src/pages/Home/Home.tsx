import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import UserLayout from "../../components/layout/UserLayout";
import { AppState } from "../../types";
import Products from "../../components/HomeProducts.tsx/index";
import { getAllProducts } from "../../redux/actions/products";

export default function Home() {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state: AppState) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <UserLayout>
      <Carousel arrows dots>
        {allProducts.map((product) => (
          <img src={product.image} />
        ))}
      </Carousel>
      <Products allProducts={allProducts} />
    </UserLayout>
  );
}
