import React from "react";
import Header from "../SECTIONS/Header";
import Footer from "../SECTIONS/Footer";
import Search from "../SECTIONS/Search";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <Header />
      <Search placeholder="What are you looking for?" />
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout;
