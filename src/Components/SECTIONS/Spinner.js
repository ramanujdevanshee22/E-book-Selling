import React from "react";
import "../CSS/spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-wrapper">
      {/* <img src="./open-book.gif"></img> */}
      <div className="balls"></div>
      <div className="balls"></div>
      <div className="balls"></div>
    </div>
  );
}
