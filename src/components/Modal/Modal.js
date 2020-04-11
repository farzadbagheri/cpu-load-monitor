import React, {useEffect, useState} from 'react';
import './Modal.css';

function Modal({content, closeModal}) {
  const close = () => {
    closeModal(false);
  }
  return (
    <div className="Modal">
      <div className="modalContent">
        <p>{content}</p>
        <button onClick={close}>Okay</button>
      </div>
    </div>
  );
}

export default Modal;
