import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../CSS/category.css";
import GreenButton from "../UI/GreenButton";
import RedButton from "../UI/RedButton";
import { toast } from "react-toastify";

function AddCategory() {
  const navigate = useNavigate();
  const Auth = useSelector((state) => state.auth.auth);
  const [categoryName, setCategoryName] = useState("");
  const [Check_categoryName, setCheck_CategoryName] = useState(false);
  useEffect(() => {
    if (categoryName.trim().length < 3) {
      setCheck_CategoryName(false);
    } else {
      setCheck_CategoryName(true);
    }
  }, [categoryName]);
  const CancelHandler = () => {
    navigate("/categories-page");
  };
  const SaveHandler = (e) => {
    e.preventDefault();
    let Category_name = {
      name: categoryName,
    };
    axios
      .post(
        `https://book-e-sell-node-api.vercel.app/api/category`,
        Category_name
      )
      .then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          toast.success("Category added.");
          navigate("/categories-page");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.code == 409) {
          toast.error(err.response.data.error);
        }
      });
  };
  return (
    <>
      <div className="category-heading">
        <span>Add Category</span>
      </div>
      <div className="reg-sub-holder" style={{ marginLeft: "90px" }}>
        <label className="reg-form-label" htmlFor="CategoryName">
          Category Name
        </label>
        <input
          type="text"
          id="CategoryName"
          name="name"
          className={Check_categoryName ? "textBox" : "textBox red-textBox"}
          onChange={(e) => setCategoryName(e.target.value)}
        ></input>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "18px",
            marginBottom: "74px",
          }}
        >
          <GreenButton buttonText="Save" onClick={SaveHandler}></GreenButton>
          &nbsp;
          <RedButton buttonText="Cancel" onSubmit={CancelHandler}></RedButton>
        </div>
      </div>
    </>
  );
}

export default AddCategory;
