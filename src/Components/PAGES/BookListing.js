import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/bookListing.css";
import RedButton from "../UI/RedButton";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { all_books } from "../STORE/books";
import { toast } from "react-toastify";
function BookListing() {
  const navigate = useNavigate();
  const Auth = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  const BOOKS = useSelector((state) => state.Books.Books);
  const [showBook, setShowBook] = useState([]);

  const addHandler = (e) => {};

  const searchHandler = (e) => {
    const search = e.target.value.toLowerCase();
    setShowBook(
      BOOKS.filter((book) => book.name.toLowerCase().includes(search))
    );
  };

  const sortHandler = (e) => {
    const value = e.target.value;
    if (value == -1) {
      var sortt = showBook.slice(0);
      setShowBook(
        sortt.sort((a, b) => {
          if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
          }
          if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
          }
        })
      );
    }
    if (value == 1) {
      var sortt = showBook.slice(0);
      setShowBook(
        sortt.sort((a, b) => {
          if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return 1;
          }
          if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return -1;
          }
        })
      );
    }
  };
  useEffect(() => {
    if (!Auth) {
      navigate("/Login");
    }
    axios
      .get("https://book-e-sell-node-api.vercel.app/api/book/all")
      .then((res) => {
        console.log(res);
        console.log("res catched");
        dispatch(all_books({ arrBooks: res.data.result }));
        setShowBook(res.data.result);
        console.log("Action dispatched");
        console.log(BOOKS);
        console.log(showBook);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <>
      <div className="book-listing-heading">
        <span>Book Listing</span>
      </div>
      <div className="book-listing-selector">
        <div className="book-listing-selector-left">
          <h2>Total-{BOOKS.length}</h2>
        </div>
        <div className="book-listing-mid">
          <input
            type="text"
            placeholder="Search"
            onChange={searchHandler}
          ></input>
        </div>
        <div className="book-listing-selector-right">
          <label>Sort-by &nbsp;</label>
          <select defaultValue={-1} onChange={sortHandler}>
            <option value={-1}>a-z</option>
            <option value={1}>z-a</option>
          </select>
        </div>
      </div>

      <div className="book-listing-items">
        {showBook.map((book) => {
          return (
            <div className="card">
              <div className="img">
                <img src={book.base64image} alt="book"></img>
              </div>
              <div className="card-title">
                <h2>{book.name}</h2>
              </div>
              <div className="category">
                <p>{book.category}</p>
              </div>
              <div>
                <p className="desc">{book.description}</p>
              </div>
              <div className="price">
                <p>RS. {book.price}</p>
              </div>
              <div className="btn">
                <RedButton
                  buttonText="ADD TO CART"
                  onClick={addHandler}
                ></RedButton>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BookListing;
