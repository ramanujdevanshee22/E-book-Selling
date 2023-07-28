import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../CSS/category.css";
import "../CSS/registration.css";
import "../UI/CSS/textBox.css";
import "../CSS/addBook.css";
import GreenButton from "../UI/GreenButton";
import RedButton from "../UI/RedButton";
import { toast } from "react-toastify";

function EditUser() {
  const navigate = useNavigate();
  const Auth = useSelector((state) => state.auth.auth);
  let params = useParams();
  const user_ID = params.user_id;
  const pw = params.pw;

  const [FirstName, setFirstName] = useState("");
  const [Check_FirstName, setCheck_FirstName] = useState(false);

  const [LastName, setLastName] = useState("");
  const [Check_LastName, setCheck_LastName] = useState(false);

  const [email, setEmail] = useState("");
  const [emailVal, changeEmailVal] = useState(false);

  const [roles, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState(42);
  const [roleVal, changeRoleVal] = useState(false);

  useEffect(() => {
    if (FirstName.trim().length < 3) {
      setCheck_FirstName(false);
    } else {
      setCheck_FirstName(true);
    }
  }, [FirstName]);

  useEffect(() => {
    if (LastName.trim().length < 3) {
      setCheck_LastName(false);
    } else {
      setCheck_LastName(true);
    }
  }, [LastName]);

  useEffect(() => {
    if (email.trim().length < 1) {
      changeEmailVal(false);
    } else if (!email.includes("@")) {
      changeEmailVal(false);
    } else if (!email.includes(".")) {
      changeEmailVal(false);
    } else {
      changeEmailVal(true);
    }
  }, [email]);
  useEffect(() => {
    axios
      .get("https://book-e-sell-node-api.vercel.app/api/user/roles")
      .then((res) => {
        // console.log(res);
        const temp = [];
        temp.push(res.data.result[0]);
        temp.push(res.data.result[1]);
        setRole(temp);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(roles);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://book-e-sell-node-api.vercel.app/api/user/byId?id=${user_ID}`
      )
      .then((res) => {
        console.log(res);
        // setCategoryName(res.data.result.name);
        setFirstName(res.data.result.firstName);
        setLastName(res.data.result.lastName);
        setEmail(res.data.result.email);
        setSelectedRole(res.data.result.roleId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const CancelHandler = () => {
    navigate("/users-page");
  };

  const EditSaveHandler = (e) => {
    e.preventDefault();
    console.log(roles);
    console.log(selectedRole);
    const rolename = roles.find((role) => {
      if (role.id === parseInt(selectedRole)) {
        // console.log(role.name);
        return role.name;
      }
    });
    // console.log(rolename);

    let updated_user = {
      id: user_ID,
      email: email,
      firstName: FirstName,
      lastName: LastName,
      roleId: selectedRole,
      role: rolename.name,
      password: pw,
    };

    axios
      .put(`https://book-e-sell-node-api.vercel.app/api/user`, updated_user)
      .then((res) => {
        console.log(res);
        toast.success("User updated");
        navigate("/users-page");
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(updated_user);
  };
  return (
    <>
      <div className="category-heading">
        <span>Edit User</span>
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
              {/* Role section */}
              <div className="reg-sub-holder">
                <label className="reg-form-label" htmlFor="role">
                  Role
                </label>
                <select
                  id="role"
                  name="roleId"
                  className="textBox"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
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

export default EditUser;
