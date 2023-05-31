import LinkButton from "../UI/LinkButton";
import WhiteButton from "../UI/WhiteButton";
import "../CSS/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../STORE/auth";
function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.auth.auth);
  const clickLogin = (e) => {
    navigate("Login");
  };

  const clickRegister = (e) => {
    navigate(" ");
  };

  const clickLogout = (e) => {
    dispatch(authActions.logout());
    localStorage.removeItem("user");
    navigate("Login");
  };
  console.log(Auth);
  return (
    <>
      {/* Header Containing logo and Login/Register/cart Button */}
      <div className="header">
        <h2>TatvaSoft</h2>

        <div className="header-buttons">
          {Auth ? (
            <>
              <LinkButton
                buttonText="Logout"
                onClick={clickLogout}
              ></LinkButton>{" "}
              | <WhiteButton buttonText="Cart" />
            </>
          ) : (
            <>
              <LinkButton buttonText="Login" onClick={clickLogin}></LinkButton>{" "}
              | <LinkButton buttonText="Register" onClick={clickRegister} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Header;
