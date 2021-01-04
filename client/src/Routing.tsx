import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/Home/Home";
import ProductPage from "./pages/Home/Product";
import CategoryPage from "./pages/Home/CategoryDisplay";
import SignInPage from "./pages/Home/SignIn";
import SignUpPage from "./pages/Home/SignUp";
import { AdminRoute, UserRoute } from "./components/PrivateRoute";
import Dashboard from "./pages/Admin/Dashboard";
import Products from "./pages/Admin/Products";
import Users from "./pages/Admin/Users";
import ChangePassword from "./pages/Admin/ChangePassword";
import UpdateProfile from "./pages/Admin/UpdateProfile";
import CreateProduct from "./pages/Admin/CreateProduct";
import UpdateProduct from "./pages/Admin/UpdatedProduct";
import Page404 from "./pages/404Page";
import CheckoutPage from "./pages/Home/Checkout";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/register" component={SignUpPage} />
      <Route path="/signin" component={SignInPage} />
      <Route path="/order-summary" component={CheckoutPage} />

      <UserRoute path="/admin" component={Dashboard} />
      <UserRoute path="/products" component={Products} />
      <UserRoute path="/users" component={Users} />
      <UserRoute path="/change-password" component={ChangePassword} />

      <UserRoute path="/update" component={UpdateProfile} />

      <UserRoute path="/create-product" component={CreateProduct} />

      <Route exact path="/product/:name" component={ProductPage} />
      <Route exact path="/:category" component={CategoryPage} />
      <UserRoute path="/product/:id" component={UpdateProduct} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}

export default Routes;
