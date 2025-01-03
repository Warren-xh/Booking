import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format, differenceInDays } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";

import { hotelData } from "./data";

const List = () => {
  // Accessing the location state from the router
  const location = useLocation();

  // State variables for managing form inputs, search results, and cart
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [date, setDate] = useState(location.state?.date || []);
  const [openDate, setOpenDate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isInitialSearch, setIsInitialSearch] = useState(true);

  const selectedDays = differenceInDays(date[0]?.endDate, date[0]?.startDate) || 1;

  // Load cart items from local storage on initial render
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Automatically search hotels on initial load based on passed-in parameters
  useEffect(() => {
    if (isInitialSearch && destination) {
      const initialResults = hotelData.filter((item) =>
          item.location.toLowerCase().includes(destination.toLowerCase())
      );
      setSearchResults(initialResults);
      setIsSearched(true);
      setIsInitialSearch(false);
    }
  }, [destination, isInitialSearch]);

  // Handle hotel search based on destination and hotel name
  const handleSearch = () => {
    setIsSearched(true);
    const results = hotelData.filter(
        (item) =>
            item.location.toLowerCase().includes(destination.toLowerCase()) &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

   // Add selected hotel to cart or update quantity if already in cart
  const addToCart = (hotel) => {
    const existingHotelIndex = cart.findIndex(
        (item) => item.id === hotel.id && item.nights === selectedDays
    );

    let updatedCart;
    if (existingHotelIndex === -1) {
      updatedCart = [...cart, { ...hotel, nights: selectedDays, quantity: 1 }];
    } else {
      updatedCart = [...cart];
      updatedCart[existingHotelIndex].quantity += 1;
    }

    setCart(updatedCart);// Update cart state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${hotel.name} has been added to the cart.`);
  };

  return (
      <div>
        <Navbar />
        <Header type="list" />
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input
                    placeholder="Enter destination..."
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>
                {date.length > 0
                    ? `${format(date[0]?.startDate, "MM/dd/yyyy")} to ${format(
                        date[0]?.endDate,
                        "MM/dd/yyyy"
                    )}`
                    : "Select dates"}
              </span>
                {openDate && (
                    <DateRange
                        onChange={(item) => setDate([item.selection])}
                        minDate={new Date()}
                        ranges={date}
                    />
                )}
              </div>
              <div className="lsItem">
                <label>Search Hotels</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter hotel name..."
                />
              </div>
              <button onClick={handleSearch}>Search</button>
            </div>

            <div className="listResult">
              {isSearched ? (
                  searchResults.length > 0 ? (
                      <div className="searchItems">
                        {searchResults.map((item) => (
                            <SearchItem
                                key={item.id}
                                room={item}
                                onAddToCart={addToCart}
                            />
                        ))}
                      </div>
                  ) : (
                      <p>No results found.</p>
                  )
              ) : (
                  <p>Search for hotels to see results.</p>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default List;
