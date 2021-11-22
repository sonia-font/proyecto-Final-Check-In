import React from "react";
import '../label/label.css'

const Label = (props) => {
    return (
        <div>
            <label className="label-container">{props.text}</label>
        </div>
    )
}

export default Label;