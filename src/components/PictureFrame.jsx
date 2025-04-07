import React from 'react';
import './PictureFrame.css';

const PictureFrame = ({ image, title, link, orientation }) => {
    return (
        <div className="frame-container">
            <div className={`frame ${orientation}`}>
                <img src={image} alt={title} className="painting" />
            </div>
            <div className="title"><a href={link}>{title}</a></div>
        </div>
    );
};

export default PictureFrame;
