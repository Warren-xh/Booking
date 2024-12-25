import React from "react";
import QuantityControl from "../../components/quantityControl/quantityControl.jsx";
import "./orderItem.css"; // 引入OrderItem对应的样式

const OrderItem = ({ room, onQuantityChange }) => {
  // 解构传递过来的房间信息
  const { hotel, roomType, pricePerNight, quantity, checkInDate, checkOutDate, image, id } = room;

  // 计算入住天数
  const days = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);

  // 计算房间总价
  const totalPrice = pricePerNight * quantity * days;

  return (
    <div className="orderItem">
      <img src={image} alt={roomType} className="orderItemImage" />
      <div className="orderItemDetails">
        <p><strong>{hotel}</strong></p>
        <p>Room Type: {roomType}</p>
        <p>Check-in: {checkInDate}</p>
        <p>Check-out: {checkOutDate}</p>
        <p>Price per Night: ${pricePerNight}</p>
        <QuantityControl 
          quantity={quantity} 
          onQuantityChange={onQuantityChange}
          id={id} 
        />
        <p><strong>Total for {quantity} room(s): ${totalPrice}</strong></p>
      </div>
    </div>
  );
};

export default OrderItem;
