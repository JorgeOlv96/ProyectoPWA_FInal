import React from 'react';
import boston1 from '../assets/image1.png';


const Blank = () => {
    return (
        <div>
            <h1>Blank </h1>
            <div className='image-container'>
                <img src={boston1} alt="boston" className='image' />
            </div>
        </div>
    );



};

export default Blank;
