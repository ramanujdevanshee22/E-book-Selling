import React from 'react';
import './CSS/whiteBtn.css';
function WhiteButton(props) {
    return (
        <div>
            <button className="whiteBtn" onClick={props.click}>{props.buttonText}</button>
        </div>
    )
}
export default WhiteButton;