import React from "react";
import { useNavigate } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({room, onAddToCart }) => {
  const navigate = useNavigate();

  const handleImageClick = (id) => {
    navigate(`/hotels/${id}`);
  };

  return (
    <div className="searchItem">
      <img
        src={room.image}
        alt={room.name}
        className="siImg"
        onClick={() => handleImageClick(room.id)}
      />
      <div className="siDesc">
        <h1 className="siTitle">{room.name}</h1>
        <span className="siLocation">{room.location}, {room.country}</span>
        <p className="siDescription">{room.description}</p>
        
        <div className="siComments">
          <strong>Comments:</strong> {room.comments}
        </div>
        <div className="siAmenities">
          <strong>Amenities:</strong> {room.amenities.join(", ")}
        </div>
      </div>
      
      <div className="siDetails">
        <div className="siRating">
          <span>{room.rating > 4.5 ? "Excellent" : room.rating > 3.5 ? "Good" : "Average"} </span>
          <button>{room.rating} 🌟</button>
        </div>
        <div className="siPriceAndRooms">
          <span className="siPrice">${room.price} / night</span>
          <span className="siRooms">Rooms available: {room.rooms}</span>
        </div>
        <button className="siCheckButton" onClick={() => onAddToCart(room)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SearchItem;
