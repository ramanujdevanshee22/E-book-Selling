import React from "react";
import "./CSS/linkBtn.css";
function LinkButton(props) {
  return (
    <div>
      <button className="linkBtn" onClick={props.onClick}>
        {props.buttonText}
      </button>
    </div>
  );
}
export default LinkButton;
