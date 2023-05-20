import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProdActions } from "../Store/data";

function ProductList() {
  const Product = useSelector((state) => state.Product);
  console.log(Product);
  const dispatch = useDispatch();
  return (
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>TITLE</th>
          <th>SOURCE</th>
          <th>QUERY</th>
        </tr>

        {Product.Product.map((prod) => {
          return (
            <tr>
              <td>{prod.id}</td>
              <td>{prod.title}</td>
              <td>{prod.Source}</td>
              <td>{prod.query}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default ProductList;
