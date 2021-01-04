import React from "react";
import { Switch, Route } from "react-router-dom";

import "../App.css";
import { AdminRoute, UserRoute } from "../components/PrivateRoute";
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import Users from "../pages/Admin/Users";
import ChangePassword from "../pages/Admin/ChangePassword";
import UpdateProfile from "../pages/Admin/UpdateProfile";
import CreateProduct from "../pages/Admin/CreateProduct";
import UpdateProduct from "../pages/Admin/UpdatedProduct";

function AdminRoutes() {
  return (
    <div>
      <AdminRoute path="/dashboard">
        <Dashboard />
      </AdminRoute>
      <AdminRoute path="/dashboard/products">
        <Products />{" "}
      </AdminRoute>
      <AdminRoute path="/dashboard/users">
        <Users />
      </AdminRoute>
      <AdminRoute path="/dashboard/user/change-password">
        <ChangePassword />
      </AdminRoute>
      <AdminRoute path="/dashboard/user/update">
        <UpdateProfile />{" "}
      </AdminRoute>
      <AdminRoute path="/dashboard/create-product">
        <CreateProduct />
      </AdminRoute>
      <AdminRoute path="/dashboard/product:id">
        <UpdateProduct />
      </AdminRoute>
    </div>
  );
}

export default AdminRoutes;
