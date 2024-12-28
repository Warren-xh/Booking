import React from "react";
import "./orderItem.css";

const OrderItem = ({ room, onQuantityChange }) => {
  const ratingLabel = room.rating > 4.5 ? "Excellent" :
                      room.rating > 3.5 ? "Good" :
                      room.rating > 2 ? "Average" : "Poor";

  return (
    <div className="orderItemContainer">
      <div className="orderItemDetails">
        <img src={room.image} alt={room.name} className="orderItemImage" />
        <div className="orderItemInfo">
          <h3 className="orderItemName">{room.name}</h3>
          <p className="orderItemLocation">{room.location}, {room.country}</p>
          <p className="orderItemDescription">{room.description}</p>
          
          <div className="orderItemDetailsGroup">
            <p className="orderItemComments"><strong>Comments:</strong> {room.comments}</p>
            <div className="orderItemAmenities">
              <strong>Amenities:</strong> {room.amenities.join(", ")}
            </div>
            <div className="orderItemRating">
              {ratingLabel} {room.rating} 🌟
            </div>
            <div className="orderItemPrice">
              <strong>Price per night:</strong> ${room.price.toFixed(2)}
            </div>
          </div>

          <div className="orderItemNights">
            <strong>Stay Duration:</strong> {room.nights} night{room.nights > 1 ? "s" : ""}
          </div>
          
          <div className="orderItemRooms">
            <strong>Available Rooms:</strong> {room.rooms}
          </div>
        </div>
      </div>
      
      {/* Move the quantity buttons to the right */}
      <div className="orderItemActions">
        <div className="quantityControls">
          <button 
            className="quantityButton" 
            onClick={() => onQuantityChange(room.id, -1)}
          >
            -
          </button>
          <span className="quantity">{room.quantity}</span>
          <button 
            className="quantityButton" 
            onClick={() => onQuantityChange(room.id, 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
