import React from "react";
import "../CSS/category.css";
import "../CSS/cart.css";
import RedButton from "../UI/RedButton";
import GreenButton from "../UI/GreenButton";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const CancelHandler = () => {
    navigate("/users-page");
  };
  const userObj = localStorage.getItem("user");
  console.log(userObj);
  return (
    <>
      <div className="category-heading">
        <span>Update Profile</span>
      </div>
      <div className="reg-container">
        <div className="reg-login-container">
          <form className="reg-login-form">
            <div className="reg-holder">
              {/* First Name Section */}
              <div className="reg-sub-holder">
                <label htmlFor="fname" className="reg-form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="firstName"
                  value={FirstName}
                  //   className="textBox"
                  className={
                    Check_FirstName ? "textBox" : "textBox red-textBox"
                  }
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              {/* Last Name Section */}
              <div className="reg-sub-holder">
                <label htmlFor="lname" className="reg-form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lastName"
                  value={LastName}
                  className={Check_LastName ? "textBox" : "textBox red-textBox"}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="reg-holder">
              {/*Email section */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  value={email}
                  className={emailVal ? "textBox" : "textBox red-textBox"}
                ></input>
              </div>
            </div>

            <div
              className="reg-holder"
              style={{ marginTop: "18px", marginBottom: "74px" }}
            >
              <GreenButton
                buttonText="Save"
                onClick={EditSaveHandler}
              ></GreenButton>
              &nbsp;
              <RedButton
                buttonText="Cancel"
                onSubmit={CancelHandler}
              ></RedButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
