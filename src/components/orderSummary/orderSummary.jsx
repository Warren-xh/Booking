import React from "react";
import "./orderSummary.css"; // 组件样式

const OrderSummary = ({ subtotal, tax, shipping, grandTotal }) => {
  return (
    <div className="orderSummary">
      <h2 className="orderSummaryTitle">Order Total</h2>
      <div className="orderSummaryDetails">
        <p>Subtotal: ${subtotal}</p>
        <p>Tax (10%): ${tax}</p>
        <p>Shipping: Free</p>
        <p><strong>Grand Total: ${grandTotal}</strong></p>
      </div>
    </div>
  );
};

export default OrderSummary;
