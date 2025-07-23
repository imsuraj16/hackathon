import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import Signup from "../pages/Signup";
import LoginPage from "../pages/LoginPage";

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Mainroutes;
