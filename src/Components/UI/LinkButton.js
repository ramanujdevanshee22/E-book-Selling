import React from 'react';
import './CSS/linkBtn.css';
function LinkButton(props) {
    return (
        <div>
            <button className="linkBtn">{props.buttonText}</button>
        </div>
    )
}
export default LinkButton;