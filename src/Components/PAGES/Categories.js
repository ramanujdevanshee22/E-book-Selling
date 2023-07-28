import React from "react";
import "../CSS/category.css";
import RedButton from "../UI/RedButton";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GreenButton from "../UI/GreenButton";
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();
  const Auth = useSelector((state) => state.auth.auth);
  const CategoryEditHandler = (e) => {
    const categoryID = e.target.value;
    console.log(categoryID);
    navigate(`/edit-category/${categoryID}`);
  };
  const addCategoryHandler = (e) => {
    navigate("/add-category");
  };

  const CategoryDeletehandler = (e) => {
    const DEL = window.confirm("Are you sure?");
    if (DEL) {
      axios
        .delete(
          `https://book-e-sell-node-api.vercel.app/api/category?id=${e.target.value}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            toast.success("Category deleted!");
            // window.location.reload();
            if (reload == 2) {
              setReload(1);
            } else {
              setReload(2);
            }
          }
        })

        .catch((err) => {
          console.log(err);
          toast.error("Cannot delete this category right now, SERVER ERROR!!");
        });
    }
  };
  const searchCategoryHandler = (e) => {
    const KEYWORD = e.target.value;
    axios
      .get(
        `https://book-e-sell-node-api.vercel.app/api/category?pageSize=${RowsPerPage}&pageIndex=${currentPage}&keyword=${KEYWORD}`
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setCATEGORIES(data.result.items);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };
  const [RowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [CATEGORIES, setCATEGORIES] = useState([]);
  const [NoMoreitems, setNoMoreItems] = useState(false);
  const [reload, setReload] = useState(1);

  function nextPage() {
    if (CATEGORIES.length === 0) {
      // setNoMoreItems(true);
      toast.error("NO MORE CATEGORIES");
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  }
  function previousPage() {
    if (currentPage === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    axios
      .get(
        `https://book-e-sell-node-api.vercel.app/api/category?pageSize=${RowsPerPage}&pageIndex=${currentPage}`
      )
      .then((res) => {
        // console.log(res);
        // console.log(res.data.result.items);

        setCATEGORIES(res.data.result.items);

        // console.log(CATEGORIES);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [RowsPerPage, currentPage, reload]);

  return (
    <>
      <div className="category-heading">
        <span>Category</span>
      </div>
      <div className="category-selector">
        <div className="category-selector-search">
          <input
            type="text"
            placeholder="Search"
            onChange={searchCategoryHandler}
          ></input>
        </div>
        <div className="category-selector-add">
          <RedButton buttonText="Add" onSubmit={addCategoryHandler} />
        </div>
      </div>

      <div className="category-main-table">
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th scope="col">Category Name</th>
              <th></th>
            </tr>
          </thead>

          {CATEGORIES.map((category) => {
            return (
              <tbody class="table-group">
                <tr>
                  <td>{category.name}</td>
                  <td>
                    <button
                      className="editButton"
                      value={category.id}
                      onClick={CategoryEditHandler}
                      style={{ marginLeft: "620px" }}
                    >
                      Edit
                    </button>
                    <button
                      className="deleteButton"
                      value={category.id}
                      onClick={CategoryDeletehandler}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>

      <div className="category-pagination">
        <div className="category-pagination-row-selector">
          <label style={{ marginRight: "10px" }}>Rows per page</label>
          <select
            name="rowsPerPage"
            onChange={(e) => setRowsPerPage(e.target.value)}
          >
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10} selected>
              10
            </option>
            <option value={100}>100</option>
          </select>
        </div>
        <p>{currentPage}</p>
        <div className="category-pagination-row-display">
          <button className="less-then" onClick={previousPage}>
            &lt;
          </button>
          {NoMoreitems ? (
            <button className="greater-then" disabled>
              &gt;
            </button>
          ) : (
            <button className="greater-then" onClick={nextPage}>
              {" "}
              &gt;{" "}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
