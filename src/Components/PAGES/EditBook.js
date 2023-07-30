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

function EditBook() {
  useEffect(() => {
    axios
      .get(`https://book-e-sell-node-api.vercel.app/api/category/all`)
      .then((res) => {
        console.log(res);
        setCategories(res.data.result);
        // setCategories((prev) => {
        //   [...prev, res.data.result];
        // });
        // let temp = [];
        // temp.push(res.data.result[0]);
        // temp.push(res.data.result[1]);
        // temp.push(res.data.result[2]);
        // temp.push(res.data.result[3]);
        // temp.push(res.data.result[4]);
        // temp.push(res.data.result[5]);
        // temp.push(res.data.result[6]);
        // temp.push(res.data.result[7]);
        // temp.push(res.data.result[8]);
        // setCategories(temp);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

        console.log(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
  const image_validation = (file) => {
    if (!file || !IMAGE_TYPES.includes(file.type) || file.size >= 1000000) {
      return false;
    } else {
      return true;
    }
  };
  const navigate = useNavigate();
  const Auth = useSelector((state) => state.auth.auth);
  let params = useParams();
  const book_ID = params.book_id;

  const [bname, setBname] = useState("");
  const [bnameVal, changeBnameVal] = useState(false);

  const [description, setDescription] = useState("");
  const [descVal, changeDescVal] = useState(false);

  const [bprice, setBprice] = useState(0);
  const [bpriceVal, changeBpriceVal] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileVal, setSelectedFileVal] = useState(false);
  const [selectedFileBase, setSelectedFileBASE] = useState("");
  useEffect(() => {
    if (image_validation(selectedFile)) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setSelectedFileBASE(reader.result);
      };
      setSelectedFileVal(true);
    } else {
      setSelectedFileVal(false);
    }
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(42);
  const [categoryVal, setCategoryeVal] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://book-e-sell-node-api.vercel.app/api/book/byId?id=
        ${book_ID}`
      )
      .then((res) => {
        console.log(res);
        setBname(res.data.result.name);
        setBprice(res.data.result.price);
        setDescription(res.data.result.description);
        setSelectedCategory(res.data.result.categoryId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (bname.trim().length < 1) {
      changeBnameVal(false);
      // changeFormVal(false);
    } else {
      changeBnameVal(true);
    }
  }, [bname]);
  useEffect(() => {
    if (bprice <= 0) {
      changeBpriceVal(false);
      // changeFormVal(false);
    } else {
      changeBpriceVal(true);
    }
  }, [bprice]);
  useEffect(() => {
    if (selectedCategory === -1) {
      setCategoryeVal(false);
      // changeFormVal(false);
    } else {
      setCategoryeVal(true);
    }
  }, [selectedCategory]);
  useEffect(() => {
    if (description.length < 1) {
      changeDescVal(false);
      // changeFormVal(false);
    } else {
      changeDescVal(true);
    }
  }, [description]);

  const CancelHandler = () => {
    navigate("/products-page");
  };

  const SaveHandler = (e) => {
    e.preventDefault();

    let new_book = {
      name: bname,
      description: description,
      price: parseInt(bprice),
      categoryId: parseInt(selectedCategory),
      base64image: selectedFileBase,
    };
    console.log(new_book);
  };
  return (
    <>
      <div className="category-heading">
        <span>Edit Book</span>
      </div>
      <div className="reg-container">
        <div className="reg-login-container">
          <form className="reg-login-form">
            <div className="reg-holder">
              {/*  Book Name Section */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" htmlFor="bname">
                  Book Name
                </label>
                <input
                  type="text"
                  id="bname"
                  name="name"
                  value={bname}
                  className={bnameVal ? "textBox" : "textBox red-textBox"}
                  onChange={(e) => setBname(e.target.value)}
                ></input>
              </div>
              {/*  Book price */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" htmlFor="bprice">
                  Book Price
                </label>
                <input
                  type="number"
                  value={bprice}
                  onChange={(e) => setBprice(e.target.value)}
                  id="bprice"
                  name="price"
                  className={bpriceVal ? "textBox" : "textBox red-textBox"}
                ></input>
              </div>
            </div>

            <div className="reg-holder">
              {/*File picker */}
              <div className="reg-sub-holder">
                <label
                  className="reg-form-label"
                  htmlFor="image"
                  // multiple="false"
                >
                  Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  id="image"
                  name="base64image"
                  className={
                    selectedFileVal ? "textBox" : "textBox red-textBox"
                  }
                ></input>
              </div>
              {/* Role section */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  name="categoryId"
                  value={selectedCategory}
                  className={categoryVal ? "textBox" : "textBox red-textBox"}
                  onChange={(e) => setCategories(e.target.value)}
                >
                  <option value={-1}>Choose one</option>
                  {categories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="reg-holder">
              <div className="reg-sub-holder">
                <label className="reg-form-label" htmlFor="description">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: "950.2px", height: "87.5px" }}
                  className={descVal ? "textBox" : "textBox red-textBox"}
                ></input>
              </div>
            </div>
            <div className="reg-holder">
              <div className="reg-sub-holder">
                <GreenButton
                  buttonText="Save"
                  onClick={SaveHandler}
                ></GreenButton>
              </div>
              <div className="reg-sub-holder">
                <RedButton
                  buttonText="Cancel"
                  onSubmit={CancelHandler}
                ></RedButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditBook;
