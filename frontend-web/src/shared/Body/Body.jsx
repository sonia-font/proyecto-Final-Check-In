import React from "react";
import '../Body/Body.css'
import Login from '../../modules/login/Login';

const Body = (props) => {
    return (
        <div className='body-container'>
            <Login />
        </div>
    )
}

export default Body;