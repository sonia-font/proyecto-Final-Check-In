import React from "react";
import '../input/input.css'

const Input = (props) => {
    return(
        <div>
            <input
            id={props.attribute.id}
            name={props.attribute.name}
            placeholder={props.attribute.placeholder}
            type={props.attribute.type}
            className={props.param ? 'input-error input-container' : 'regular-style input-container'}
            />
        </div>
    )
}

export default Input;