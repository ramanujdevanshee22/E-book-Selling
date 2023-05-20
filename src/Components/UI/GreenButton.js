import React from 'react';
import './CSS/greenBtn.css';
function GreenButton(props) {
    return (
        <div>
            <button className="greenBtn">{props.buttonText}</button>
        </div>
    )
}
export default GreenButton;