import React from "react";
import { Switch, Route } from "react-router-dom";

import "../App.css";
import HomePage from "../pages/Home/Home";
import ProductPage from "../pages/Home/Product";
import CategoryPage from "../pages/Home/CategoryDisplay";
import SignInPage from "../pages/Home/SignIn";
import SignUpPage from "../pages/Home/SignUp";

function NormalRoute() {
  return (
    <div>
      <Route path="/" component={HomePage} />
      <Route path="/register" component={SignUpPage} />
      <Route path="/signin" component={SignInPage} />
      <Route path="/product/:name" component={ProductPage} />
      <Route path="/:category" component={CategoryPage} />
    </div>
  );
}

export default NormalRoute;
