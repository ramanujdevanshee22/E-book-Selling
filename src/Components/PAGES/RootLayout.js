import React from "react";
import Header from "../SECTIONS/Header";
import Footer from "../SECTIONS/Footer";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout;
