import "../CSS/registration.css";
import "../UI/CSS/textBox.css";
import RedButton from "../UI/RedButton";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Registration() {
  const [roles, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState(-1);
  const [roleVal, changeRoleVal] = useState(false);
  useEffect(() => {
    axios
      .get("https://book-e-sell-node-api.vercel.app/api/user/roles")
      .then((res) => {
        //  console.log(res);
        return res.data;
      })
      .then((data) => {
        // console.log(data);
        if (data.code === 200) {
          // console.log(data.result);
          console.log(data.result);

          const temp = [];
          temp.push(data.result[0]);
          temp.push(data.result[1]);
          setRole(temp);

          // setRole((roles) => [...roles, data.result[0], data.result[1]]);
          // console.log(roles);

          // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

          // console.log(data.result[1]);
          // setRole((prevItems) => [...prevItems, data.result[1]]);

          console.log("---------------------------------");
          console.log(roles);
        }
      });
  }, []);
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
    if (fnameVal && lnameVal && emailVal && pwVal && cPwVal && roleVal) {
      changeFormVal(true);
    } else {
      changeFormVal(false);
    }
  }, [fnameVal, lnameVal, emailVal, pwVal, cPwVal, roleVal]);

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
    } else if (!email.includes(".")) {
      changeEmailVal(false);
      changeFormVal(false);
    } else {
      changeEmailVal(true);
    }
  }, [email]);
  useEffect(() => {
    if (selectedRole === -1) {
      changeRoleVal(false);
      changeFormVal(false);
    } else {
      changeRoleVal(true);
    }
  }, [selectedRole]);
  useEffect(() => {
    if (password.trim().length < 5) {
      changePwVal(false);
      changeFormVal(false);
    } else {
      changePwVal(true);
    }
  }, [password]);
  useEffect(() => {
    if (cPassword.trim().length < 5) {
      changeCPwVal(false);
      changeFormVal(false);
    } else if (cPassword !== password) {
      changeCPwVal(false);
      changeFormVal(false);
    } else {
      changeCPwVal(true);
    }
  }, [cPassword, password]);

  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    const rolename = roles.find((role) => {
      if (role.id == selectedRole) {
        return role.name;
      }
    });

    let user = {
      firstName: fname,
      lastName: lname,
      email: email,
      roleId: selectedRole,
      password: password,
      // role: rolename.name,
    };
    axios
      .post(
        "https://book-e-sell-node-api.vercel.app/api/user",
        user
        // JSON.stringify(user)
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          console.log("Created user");
          toast.success("Successfully created!!");
          navigate("Login");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
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
                <label className="reg-form-label" htmlFor="fname">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="firstName"
                  className={fnameVal ? "textBox" : "textBox red-textBox"}
                  onChange={(e) => setFname(e.target.value)}
                ></input>
              </div>
              {/*  Last Name section */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" htmlFor="lname">
                  Last Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setLname(e.target.value)}
                  id="lname"
                  name="lastName"
                  className={lnameVal ? "textBox" : "textBox red-textBox"}
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
                  className={emailVal ? "textBox" : "textBox red-textBox"}
                ></input>
              </div>
              {/* Role section */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" htmlFor="role">
                  Role
                </label>
                <select
                  id="role"
                  name="roleId"
                  className={roleVal ? "textBox" : "textBox red-textBox"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  defaultValue={-1}
                >
                  {/* <option value={-1}>Choose one!!</option>
                  <option value={3}>Buyer</option>
                  <option value={2}>Seller</option>
                </select> */}
                  <option value={-1}>Choose one</option>
                  {roles.map((role) => {
                    return (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    );
                  })}
                </select>
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
                  name="password"
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
