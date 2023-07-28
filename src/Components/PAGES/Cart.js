import React from "react";
import "../CSS/category.css";
import "../CSS/cart.css";
import RedButton from "../UI/RedButton";
import axios from "axios";
import Spinner from "../SECTIONS/Spinner";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../STORE/cart";
function Cart() {
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const Auth = useSelector((state) => state.auth.auth);
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);
  const userID = JSON.parse(localStorage.getItem("user")).id;
  const dispatch = useDispatch();

  useEffect(() => {
    update_cart();
  }, []);
  const update_cart = () => {
    console.log("here");
    setLoading(true);
    axios
      .get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${userID}`)
      .then((res) => {
        setLoading(false);
        console.log(res.data.result);
        dispatch(cartActions.update_cart({ cart: res.data.result }));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const addQuantityHandler = (bookId) => {
    // const bookId = e.target.value;
    const object = cart.find((item) => {
      if (bookId === item.bookId) {
        return item;
      }
    });

    // console.log(object);
    const new_object = {
      id: object.id,
      bookId: object.bookId,
      userId: object.userId,
      quantity: object.quantity + 1,
    };
    // console.log(new_object);
    update_item(new_object);
  };
  const subtractQuantityHandler = (bookId) => {
    // const bookId = e.target.value;
    const object = cart.find((item) => {
      if (bookId === item.bookId) {
        return item;
      }
    });

    console.log(object);
    if (object.quantity === 1) {
      toast.error("Item quantity should not be zero.");
    } else {
      const new_object = {
        id: object.id,
        bookId: object.bookId,
        userId: object.userId,
        quantity: object.quantity - 1,
      };
      console.log(new_object);
      update_item(new_object);
    }
  };
  const update_item = (renew) => {
    setLoading(true);
    axios
      .put(`https://book-e-sell-node-api.vercel.app/api/cart`, renew)
      .then((res) => {
        setLoading(false);
        update_cart();
        // setCartItems(res.data.result);
        // console.log(res);
        // if (reload == 2) {
        //   setReload(1);
        // } else {
        //   setReload(2);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeCartHandler = (ItemId) => {
    const ItemID = parseInt(ItemId);
    axios
      .delete(`https://book-e-sell-node-api.vercel.app/api/cart?id=${ItemID}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  function PlaceORderHandler() {
    let cartBooks = cart.map((item) => {
      return item.id;
    });

    const placeOrder = {
      userId: userID,
      cartIds: cartBooks,
    };
    // console.log(cartBooks);
    axios
      .post(`https://book-e-sell-node-api.vercel.app/api/order`, placeOrder)
      .then((res) => {
        // console.log(res);
        toast.success("Order placed successfully!!!");
        navigate("/book-listing");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      {console.log(cart)}
      {isLoading && <Spinner />}
      <div className="cart-page">
        <div className="category-heading">
          <span>Cart Page</span>
        </div>
        <div className="cart-holder">
          <h5 style={{ fontSize: "18px" }}>
            My Shopping Bag ( {cart.length} Items )
          </h5>
          <h6 style={{ fontSize: "15px" }}>Total price: {total}₹</h6>
        </div>
        {cart.length < 1 ? (
          <h3
            style={{
              textAlign: "center",
              padding: "43px",
              borderRadius: "5px",
              marginLeft: "440px",
              marginBottom: "20px",
              width: "700px",
              height: "131.6px",
              marginTop: "1px",
              color: "red",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              // border: "2px solid green",
            }}
          >
            EMPTY CART!
          </h3>
        ) : (
          <></>
        )}
        {cart.map((item) => {
          return (
            <div className="cart-sub-holder" key={item.id}>
              <img src={item.book.base64image}></img>
              <div className="cart-item-right">
                <div className="item-name-price">
                  <p>{item.book.name}</p>
                  <p>MRP ₹{item.book.price}</p>
                </div>
                <p
                  style={{ color: "red", marginLeft: "5px", marginTop: "0px" }}
                >
                  {" "}
                  Cart item name{" "}
                </p>
                <div className="item-quantity-remove">
                  <button
                    // value={item.book.bookId}
                    className="redBtn card-btn"
                    onClick={() => addQuantityHandler(item.bookId)}
                  >
                    <h6>+</h6>
                  </button>
                  <p>{item.quantity}</p>

                  <button
                    className="redBtn card-btn"
                    onClick={() => subtractQuantityHandler(item.bookId)}
                  >
                    <h6>-</h6>
                  </button>
                  <button
                    onClick={() => removeCartHandler(item.id)}
                    className="remove-btn"
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      color: "red",
                      marginTop: "0px",
                      marginLeft: "400px",
                      marginBottom: "16px",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="cart-footer">
          {cart.length < 1 ? (
            <></>
          ) : (
            <RedButton
              buttonText="Place Order"
              // onClick={() => PlaceORderHandler(cartItems)}
              onSubmit={PlaceORderHandler}
            ></RedButton>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
