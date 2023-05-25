import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProdActions } from "../STORE/data";
import { Link } from "react-router-dom";

function ProductList() {
  const Product = useSelector((state) => state.Product);
  console.log(Product);
  const dispatch = useDispatch();
  return (
    <div>
      <Link to="/product-page/add"></Link>
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
              <td>{prod.Query}</td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          );
        })}
      </table>

      {/* <button
        onClick={dispatch(
          ProdActions.add({
            id: 11,
            title: "IBSM FollowUP",
            Source: "Data Source 11",
            Query: "Teste",
          })
        )}
      >
        Add Product
      </button> */}
    </div>
  );
}

export default ProductList;
