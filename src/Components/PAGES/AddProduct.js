import React from "react";
import { ProdActions } from "../STORE/data";
import { useDispatch } from "react-redux";

function AddProduct() {
  return (
    <div>
      <h4>Add product here</h4>
      <form>
        <label htmlFor="id">Id : </label>
        <input type="text" name="id"></input>
        <br></br>
        <label htmlFor="title">Title : </label>
        <input type="text" name="title"></input>
        <br></br>
        <label htmlFor="Source">Source : </label>
        <input type="text" name="Source"></input>
        <br></br>
        <label htmlFor="Query">Query: </label>
        <input type="text" name="Query"></input>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
