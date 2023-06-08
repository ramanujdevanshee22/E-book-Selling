import React from "react";
import "../CSS/category.css";
import RedButton from "../UI/RedButton";

export default function Categories() {
  const addCategoryHandler = (e) => {};
  return (
    <>
      <div className="category-heading">
        <span>Category</span>
      </div>
      <div className="category-selector">
        <div className="category-selector-search">
          <input type="text" placeholder="Search"></input>
        </div>
        <div className="category-selector-add">
          <RedButton buttonText="Add" onSubmit={addCategoryHandler} />
        </div>
      </div>

      <div className="category-main-table">
        <table>
          <thead>
            <tr>
              <td className="table-left">Category Name</td>
              <td className="table-right"></td>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}
