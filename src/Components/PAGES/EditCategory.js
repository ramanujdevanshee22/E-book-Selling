import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../CSS/category.css";
import GreenButton from "../UI/GreenButton";
import RedButton from "../UI/RedButton";
import { toast } from "react-toastify";

function EditCategory() {
  const navigate = useNavigate();
  const Auth = useSelector((state) => state.auth.auth);
  let params = useParams();
  const category_ID = params.category_id;
  // console.log(category_ID);
  const [categoryName, setCategoryName] = useState("");
  const [Check_categoryName, setCheck_CategoryName] = useState(false);
  useEffect(() => {
    if (categoryName.trim().length < 3) {
      setCheck_CategoryName(false);
    } else {
      setCheck_CategoryName(true);
    }
  }, [categoryName]);
  useEffect(() => {
    axios
      .get(
        `https://book-e-sell-node-api.vercel.app/api/category/byId?id=${category_ID}`
      )
      .then((res) => {
        console.log(res);
        setCategoryName(res.data.result.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const CancelHandler = () => {
    navigate("/categories-page");
  };

  const EditSaveHandler = () => {
    let updated_category = {
      id: parseInt(category_ID),
      name: categoryName,
    };

    axios
      .put(
        `https://book-e-sell-node-api.vercel.app/api/category/`,
        updated_category
      )
      .then((res) => {
        console.log(res);
        navigate("/categories-page");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="category-heading">
        <span>Edit Category</span>
      </div>
      <div className="reg-sub-holder" style={{ marginLeft: "90px" }}>
        <label className="reg-form-label" htmlFor="CategoryName">
          Category Name
        </label>
        <input
          type="text"
          id="CategoryName"
          name="name"
          value={categoryName}
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
          <GreenButton
            buttonText="Save"
            onClick={EditSaveHandler}
          ></GreenButton>
          &nbsp;
          <RedButton
            buttonText="Cancel"
            onSubmit={CancelHandler}
            style={{ marginLeft: "10px" }}
          ></RedButton>
        </div>
      </div>
    </>
  );
}

export default EditCategory;
