import React from "react";
import "./orderItem.css"; // 引入OrderItem样式

const OrderItem = ({ room, onQuantityChange }) => {
  const { hotel, roomType, pricePerNight, quantity, checkInDate, checkOutDate, image, id } = room;

  const days = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);

  const totalPrice = pricePerNight * quantity * days;

  const handleQuantityChange = (delta) => {
    onQuantityChange(id, delta);
  };

  return (
    <div className="orderItem">
      <div className="orderItemImageWrapper">
        <img src={image} alt={roomType} className="orderItemImage" />
      </div>
      <div className="orderItemDetails">
        <h3 className="orderItemHotel">{hotel}</h3>
        <p className="orderItemRoomType">Room Type: {roomType}</p>
        <p className="orderItemDates">
          Check-in: {checkInDate} | Check-out: {checkOutDate}
        </p>
        <p className="orderItemPrice">Price per Night: ${pricePerNight}</p>

        <div className="quantityControl">
          <button 
            onClick={() => handleQuantityChange(-1)} 
            className="quantityButton"
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className="quantityInput"
          />
          <button 
            onClick={() => handleQuantityChange(1)} 
            className="quantityButton"
          >
            +
          </button>
        </div>

        <p className="orderItemTotal">
          <strong>Total for {quantity} room(s): ${totalPrice}</strong>
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
