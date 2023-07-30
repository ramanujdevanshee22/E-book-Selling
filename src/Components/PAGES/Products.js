import React from "react";
import "../CSS/category.css";
import axios from "axios";
import { useState, useEffect } from "react";
import RedButton from "../UI/RedButton";
import GreenButton from "../UI/GreenButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { all_books } from "../STORE/books";
import Spinner from "../SECTIONS/Spinner";

function Products() {
  const [IsLoading, setLoading] = useState(false);
  const [RowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [Books, setBooks] = useState([]);
  const [NoMoreitems, setNoMoreItems] = useState(false);
  const [reload, setReload] = useState(1);
  const dispatch = useDispatch();
  const BOOKS = useSelector((state) => state.Books.Books);
  const Auth = useSelector((state) => state.auth.auth);
  const navigate = useNavigate();

  const addBookHandler = () => {
    navigate("/add-book");
  };

  const BookEditHandler = (e) => {
    const bookID = e.target.value;
    console.log(bookID);
    navigate(`/edit-book/${bookID}`);
  };
  const BookDeletehandler = (e) => {
    const DEL = window.confirm("Are you sure?");
    if (DEL) {
      axios
        .delete(
          `https://book-e-sell-node-api.vercel.app/api/book?id=${e.target.value}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            toast.success("Book deleted!");
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
          toast.error("Cannot delete this book right now, SERVER ERROR!!");
        });
    }
  };
  const searchBookHandler = (e) => {
    const KEYWORD = e.target.value;
    axios
      .get(
        `https://book-e-sell-node-api.vercel.app/api/book/search?keyword=${KEYWORD}`
      )

      .then((res) => {
        // console.log(res);
        // console.log(res.data.result);
        dispatch(all_books({ arrBooks: res.data.result }));
        console.log(BOOKS);
      })
      .catch((err) => {
        // toast.error(err.response.data.error);
        window.location.reload();
      });
  };

  function nextPage() {
    if (BOOKS.length === 0) {
      // setNoMoreItems(true);
      toast.error("NO MORE BOOKS");
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
        `https://book-e-sell-node-api.vercel.app/api/book?pageSize=${RowsPerPage}&pageIndex=${currentPage}`
      )
      .then((res) => {
        // console.log(res);
        dispatch(all_books({ arrBooks: res.data.result.items }));
        // console.log(BOOKS);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [RowsPerPage, currentPage, reload]);
  return (
    <>
      {/* <Spinner /> */}
      <div className="category-heading">
        <span>Books Page</span>
      </div>

      <div className="category-selector">
        <div className="category-selector-search">
          <input
            type="text"
            placeholder="Search"
            onChange={searchBookHandler}
          ></input>
        </div>
        <div className="category-selector-add">
          <RedButton buttonText="Add" onSubmit={addBookHandler} />
        </div>
      </div>
      <div className="category-main-table">
        <table class="table">
          <thead class="table-dark">
            <tr>
              <th scope="col">Book Name</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {BOOKS.map((book) => {
            return (
              <tbody class="table-group">
                <tr>
                  <td>{book.name}</td>
                  <td>{book.price}₹</td>
                  <td>{book.category}</td>
                  <td></td>
                  <td>
                    <button
                      className="editButton"
                      value={book.id}
                      onClick={BookEditHandler}
                      style={{ marginLeft: "30px" }}
                    >
                      Edit
                    </button>
                    <button
                      className="deleteButton"
                      value={book.id}
                      onClick={BookDeletehandler}
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

export default Products;
