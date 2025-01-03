import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { hotelData } from "../list/data";

const Hotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]); // 用于管理购物车
  const [selectedDays, setSelectedDays] = useState(1); // 默认选择1天

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  // Load the hotel data from the hotelData array based on the hotel ID from the URL
  useEffect(() => {
    const currentHotel = hotelData.find((hotel) => hotel.id === parseInt(id));
    setHotel(currentHotel); // Set the selected hotel data
  }, [id]);

  // Function to add the selected hotel to the cart
  const addToCart = (hotel) => {
    const newCartItem = { ...hotel, nights: selectedDays };

    const existingHotelIndex = cart.findIndex(
      (item) => item.id === hotel.id && item.nights === selectedDays
    );

    let updatedCart;
    if (existingHotelIndex === -1) {
      updatedCart = [...cart, { ...newCartItem, quantity: 1 }];
    } else {
      updatedCart = [...cart];
      updatedCart[existingHotelIndex].quantity += 1;
    }

    setCart(updatedCart);
    // Save the updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${hotel.name} has been added to the cart.`);
  };

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  // Function to navigate through the images in the slider
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

   // Display a loading message if the hotel data is not yet available
  if (!hotel) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={() => addToCart(hotel)}>
            Reserve or Book Now!
          </button>
          <h1 className="hotelTitle">{hotel.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>
              {hotel.location}, {hotel.country}
            </span>
          </div>
          <span className="hotelDistance">{hotel.description}</span>
          <span className="hotelPriceHighlight">
            Book a stay over ${hotel.price} at this property and get a free
            airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">
                Stay in the heart of of {hotel.location}
              </h1>
              <p className="hotelDesc">{hotel.comments}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {selectedDays}-night stay!</h1>

              <span>
                Located in the real heart of {hotel.location}, this property has
                an excellent location score of 9.8!
                <p>({hotel.rooms} rooms available)</p>
              </span>
              <h2>
                <b>${hotel.price}/night</b>
              </h2>
              <button onClick={() => addToCart(hotel)}>
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
        <MailList />
      </div>
    </div>
  );
};

export default Hotel;
