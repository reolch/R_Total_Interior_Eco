import React from 'react';
import './Modal.css';

const Modal = ({ content, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2>{content.title}</h2>
        <img src={content.image} alt={content.title} />
        <p>{content.description}</p>
        {content.link && (
          <a href={content.link} target="_blank" rel="noopener noreferrer" className="modal-link">
            Learn More
          </a>
        )}
      </div>
    </div>
  );
};

export default Modal;
