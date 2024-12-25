import React from "react";
import QuantityControl from "../quantityControl/quantityControl";
import "./orderItem.css";

const OrderItem = ({ room, onQuantityChange }) => {
  const { hotel, roomType, pricePerNight, quantity, checkInDate, checkOutDate, image } = room;

  const days = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);

  return (
    <div className="orderItem">
      <img src={image} alt={roomType} />
      <div className="orderItemDetails">
        <p><strong>{hotel}</strong></p>
        <p>Room Type: {roomType}</p>
        <p>Check-in: {checkInDate}</p>
        <p>Check-out: {checkOutDate}</p>
        <p>Price per Night: ${pricePerNight}</p>
        <QuantityControl 
          quantity={quantity} 
          onQuantityChange={onQuantityChange}
          id={room.id} 
        />
        <p><strong>Total for {quantity} room(s): ${pricePerNight * quantity * days}</strong></p>
      </div>
    </div>
  );
};

export default OrderItem;
