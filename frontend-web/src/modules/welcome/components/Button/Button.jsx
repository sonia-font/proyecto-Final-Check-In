import React from "react";
import '../Button/Button.css'

const Button = (props) =>{
    return(
        <div>
            <button className='boton-login'>
                {props.text}
            </button>
        </div>
    )
}

export default Button;