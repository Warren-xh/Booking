import React from "react";
import "./quantityControl.css";

const QuantityControl = ({ quantity, onQuantityChange, id }) => {
  return (
    <div className="quantityControl">
      <button onClick={() => onQuantityChange(id, -1)} className="quantityButton">-</button>
      <input
        type="number"
        value={quantity}
        readOnly
        className="quantityInput"
      />
      <button onClick={() => onQuantityChange(id, 1)} className="quantityButton">+</button>
    </div>
  );
};

export default QuantityControl;
