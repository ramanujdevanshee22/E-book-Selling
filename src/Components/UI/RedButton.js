import React from 'react';
import './CSS/redBtn.css';
function RedButton(props) {

    return (
        <div>
            <button className='redBtn' onClick={props.onSubmit}>{props.buttonText}</button>
        </div >
    )
}
export default RedButton;