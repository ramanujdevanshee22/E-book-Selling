import React, { useState, useEffect } from "react";
import "../CSS/login.css";
import "../UI/CSS/textBox.css";
import RedButton from "../UI/RedButton";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailVal, setEmailVal] = useState(0);

  const [password, setPassword] = useState("");
  const [pwVal, setPwVal] = useState(0);

  const [formVal, setFormVal] = useState(0);
  useEffect(() => {
    setFormVal(0);
  }, []);
  useEffect(() => {
    if (email.trim().length < 0) {
      setEmailVal(0);
      setFormVal(0);
    } else {
      setEmailVal(1);
    }
    if (!email.includes("@")) {
      setEmailVal(0);
      setFormVal(0);
    } else {
      setEmailVal(1);
    }
  }, [email]);
  useEffect(() => {
    if (password.trim().length < 1) {
      setPwVal(0);
      setFormVal(0);
    } else {
      setPwVal(1);
    }
  }, [password]);
  useEffect(() => {
    if (emailVal == true && pwVal == true) {
      setFormVal(1);
    } else {
      setFormVal(0);
    }
  }, [emailVal, pwVal]);

  const submitForm = (e) => {
    navigate("/");
  };
  const checkForm = (e) => {
    e.preventDefault();
    let fetch_user = {
      email: email,
      password: password,
    };
    axios
      .post(
        "https://book-e-sell-node-api.vercel.app/api/user/login",
        fetch_user
      )
      .then((result) => {
        console.log(result);
        if (result.data.code === 200) {
          toast.success("You are logged in!!!");
          navigate("/product-page");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.code === 401) {
          toast.error(err.response.data.error);
          navigate("/Login");
        }
      });
  };
  return (
    <>
      <div className="login-login-heading">
        <span>Login or Create an Account</span>
      </div>
      <div className="login-main-container">
        <div className="login-sub-container">
          <span className="login-sub-header">New Customer</span>
          <span className="login-msg">Registration is free and easy</span>
          <ul className="login-ul">
            <li className="login-li">Faster Checkout</li>
            <li className="login-li">Save multiple shipping addresses</li>
            <li className="login-li">View and track orders and more</li>
          </ul>
          <div className="login-button-container">
            <RedButton buttonText="Create An Account" onSubmit={submitForm} />
          </div>
        </div>
        <div className="login-sub-container">
          <span className="login-sub-header">Registered User</span>
          <span className="login-msg">
            If you have account with us, please log in
          </span>
          {/* ----------------  Form Here */}
          <form className="login-form">
            {/* ->>>>>>>>> Email section */}
            <div className="login-sub-holder">
              <label className="login-form-label" for="email">
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className={emailVal ? "textBox" : "textBox red-textBox"}
                id="email"
                name="email"
              ></input>
            </div>
            <div className="login-sub-holder">
              <label className="login-form-label" for="password">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className={pwVal ? "textBox" : "textBox red-textBox"}
                id="password"
                name="password"
              ></input>
            </div>
            <div className="login-sub-holder">
              {formVal ? (
                <RedButton buttonText="Login" onSubmit={checkForm} />
              ) : (
                <h4 style={{ color: "#f14d54" }}>Invalid Details</h4>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
