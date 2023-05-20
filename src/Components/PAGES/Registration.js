import "../CSS/registration.css";
import "../UI/CSS/textBox.css";
import RedButton from "../UI/RedButton";
import React, { useState, useEffect } from "react";
function Registration() {
  const [fname, setFname] = useState("");
  const [fnameVal, changeFnameVal] = useState(false);

  const [lname, setLname] = useState("");
  const [lnameVal, changeLnameVal] = useState(false);

  const [email, setEmail] = useState("");
  const [emailVal, changeEmailVal] = useState(false);

  const [password, setPassword] = useState("");
  const [pwVal, changePwVal] = useState(false);

  const [cPassword, setCPassword] = useState("");
  const [cPwVal, changeCPwVal] = useState(false);

  const [formVal, changeFormVal] = useState(false);

  useEffect(() => {
    if (fnameVal && lnameVal && emailVal && pwVal && cPwVal) {
      changeFormVal(true);
    } else {
      changeFormVal(false);
    }
  }, [fnameVal, lnameVal, emailVal, pwVal, cPwVal]);

  useEffect(() => {
    if (lname.trim().length < 1) {
      changeLnameVal(false);
      changeFormVal(false);
    } else {
      changeLnameVal(true);
    }
  }, [lname]);
  useEffect(() => {
    if (fname.trim().length < 1) {
      changeFnameVal(false);
      changeFormVal(false);
    } else {
      changeFnameVal(true);
    }
  }, [fname]);
  useEffect(() => {
    if (email.trim().length < 1) {
      changeEmailVal(false);
      changeFormVal(false);
    } else if (!email.includes("@")) {
      changeEmailVal(false);
      changeFormVal(false);
    } else {
      changeEmailVal(true);
    }
  }, [email]);
  useEffect(() => {
    if (password.trim().length < 1) {
      changePwVal(false);
      changeFormVal(false);
    } else {
      changePwVal(true);
    }
  }, [password]);
  useEffect(() => {
    if (cPassword.trim().length < 1) {
      changeCPwVal(false);
      changeFormVal(false);
    } else if (cPassword !== password) {
      changeCPwVal(false);
      changeFormVal(false);
    } else {
      changeCPwVal(true);
    }
  }, [cPassword, password]);

  const submitForm = (e) => {
    e.preventDefault();
    let user = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    };
    console.log(JSON.stringify(user));
  };

  return (
    <>
      <div className="reg-container">
        <div className="reg-login-heading">
          <span>Login or Create an Account</span>
        </div>
        <div className="reg-sub-heading">
          <span className="reg-info">Personal Information </span>
          <hr></hr>
          <span className="reg-instructions">
            Please enter the following information to create your account
          </span>
        </div>
        <div className="reg-login-container">
          <form className="reg-login-form">
            <div className="reg-holder">
              {/*  First Name section */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" for="fname">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  className={fnameVal ? "textBox" : "textBox red-textBox"}
                  onChange={(e) => setFname(e.target.value)}
                ></input>
              </div>
              {/*  Last Name section */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" for="lname">
                  Last Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setLname(e.target.value)}
                  id="lname"
                  className={lnameVal ? "textBox" : "textBox red-textBox"}
                ></input>
              </div>
            </div>
            <div className="reg-holder">
              {/*Email section */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" for="email">
                  Email Address
                </label>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className={emailVal ? "textBox" : "textBox red-textBox"}
                ></input>
              </div>
            </div>
            <div className="reg-sub-heading" id="reg-login">
              <span className="reg-info">Login Information</span>
              <hr></hr>
            </div>
            <div className="reg-holder">
              {/*Password section */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" for="password">
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className={pwVal ? "textBox" : "textBox red-textBox"}
                ></input>
              </div>
              {/* Re-Password section */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" for="re-password">
                  Confirm Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setCPassword(e.target.value)}
                  id="re-password"
                  className={cPwVal ? "textBox" : "textBox red-textBox"}
                ></input>
              </div>
            </div>
            <div className="reg-holder">
              {formVal ? (
                <RedButton buttonText="Register" onSubmit={submitForm} />
              ) : (
                <h3 style={{ color: "red" }}>Invalid Form</h3>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Registration;
