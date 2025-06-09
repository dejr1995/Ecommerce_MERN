import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Cart from "../components/Cart";
import NotFound from "../components/NotFound";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import CheckoutSuccess from "../components/CheckoutSuccess";
import Dashboard from "../components/admin/Dashboard";
import Products from "../components/admin/Products";
import Summary from "../components/admin/Summary";
import CreateProduct from "../components/admin/CreateProduct";
import ProductsList from "../components/admin/list/ProductsList";
import Users from "../components/admin/Users";
import Orders from "../components/admin/Orders";
import Product from "../components/details/Product";
import Order from "../components/details/Order";
import UserProfile from "../components/details/UserProfile";
import Banners from "../components/admin/Banners";
import CreateBanner from "../components/admin/CreateBanner";
import BannersList from "../components/admin/list/BannersList";
import DashboardClient from "../components/client/DashboardClient";
import OrdersClient from "../components/client/OrdersClient";
import Clients from "../components/client/Clients";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact={true} element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/order/:id" element={<Order />} />
      <Route path="/user/:id" element={<UserProfile />} />
      <Route path="/admin" element={<Dashboard />}>
        <Route path="products" element={<Products />}>
          <Route index element={<ProductsList />} />
          <Route path="create-product" element={<CreateProduct />} />
        </Route>
        <Route path="banners" element={<Banners />}>
          <Route index element={<BannersList />} />
          <Route path="create-banner" element={<CreateBanner />} />
        </Route>
        <Route path="summary" element={<Summary />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
        <Route path="ordersclient" element={<OrdersClient />} />
        <Route path="myuser" element={<Clients />} />
      </Route>
      <Route path="/client" element={<DashboardClient />}>
        <Route path="ordersclient" element={<OrdersClient />} />
        <Route path="clients" element={<Clients />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MyRoutes;
