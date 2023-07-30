import GreenButton from "../UI/GreenButton";
import RedButton from "../UI/RedButton";
import "../CSS/searchSection.css";
import "../UI/CSS/textBox.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
function Search(props) {
  const [fetched_Blist, setBlist] = useState([]);
  const [openSearchList, setOpen] = useState(false);
  const CancelBtnHandler = (e) => {
    setOpen(false);
  };
  const SearchBtnHandler = (e) => {
    axios
      .get(
        `https://book-e-sell-node-api.vercel.app/api/book/search?keyword=${e.target.value}`
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.code == 200) {
          setBlist(res.data.result);
        }
        console.log(fetched_Blist);
      })
      .catch((err) => {
        console.log(err);
        // toast.error("Enter keyword to search product");
        // setOpen(false);
      });

    setOpen(true);
  };
  const searchHandler = (e) => {
    axios
      .get(
        `https://book-e-sell-node-api.vercel.app/api/book/search?keyword=${e.target.value}`
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.code == 200) {
          setBlist(res.data.result);
        }
        console.log(fetched_Blist);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Enter keyword to search product");
        setOpen(false);
      });

    setOpen(true);
  };
  return (
    <>
      <div className="search-section">
        <div>
          <input
            type="text"
            placeholder={props.placeholder}
            className="textBox1"
            onChange={searchHandler}
          ></input>
          {openSearchList && (
            <div className="search-main-div">
              {fetched_Blist.map((book) => {
                return (
                  <div className="search-single-item">
                    <div className="item-name-desc">
                      {/* <h4 style={{ textDecorationLine: "underline" }}> */}
                      <h4>{book.name}</h4>
                      <p style={{ color: "grey", fontFamily: "cursive" }}>
                        {book.description}
                      </p>
                    </div>

                    <div className="item-price-cart">
                      <h2>Rs.{book.price}</h2>
                      <Link>Add to cart</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <GreenButton buttonText="Search" onClick={SearchBtnHandler} />
        <RedButton buttonText="Cancel" onSubmit={CancelBtnHandler} />
      </div>
    </>
  );
}
export default Search;
