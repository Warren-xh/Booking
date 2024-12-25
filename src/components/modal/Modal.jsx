// src/components/Modal.jsx
import React from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>Are you sure you want to proceed to payment?</h2>
        <div className="modalActions">
          <button onClick={onConfirm} className="modalButton confirmButton">Yes</button>
          <button onClick={onClose} className="modalButton cancelButton">No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
