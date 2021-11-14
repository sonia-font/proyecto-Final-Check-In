import React from 'react';
import '../title/title.css'

const Title =  (props) => {
    return(
        <div className='title-container'>
            {props.text}
        </div>
    )
}

export default Title;