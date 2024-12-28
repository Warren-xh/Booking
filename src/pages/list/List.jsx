import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format, differenceInDays } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem"; // 引入SearchItem组件

import { hotelData } from "./data";

const List = () => {
  const location = useLocation();

  // 设置状态变量
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [date, setDate] = useState(location.state?.date || []);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state?.options || {});
  const [searchTerm, setSearchTerm] = useState("");  
  const [searchResults, setSearchResults] = useState([]);  
  const [cart, setCart] = useState([]);  

  const selectedDays = differenceInDays(date[0]?.endDate, date[0]?.startDate) || 1;

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    if (destination) {
      const results = hotelData.filter((item) =>
        item.location.toLowerCase().includes(destination.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [destination]);

  const handleSearch = () => {
    const results = hotelData.filter(
      (item) =>
        item.location.toLowerCase().includes(destination.toLowerCase()) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

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

    setCart(updatedCart);
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
                {`${format(date[0]?.startDate, "MM/dd/yyyy")} to ${format(
                  date[0]?.endDate,
                  "MM/dd/yyyy"
                )}`}
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
            {searchResults.length > 0 ? (
              <div className="searchItems">
                {searchResults.map((item) => (
                  <SearchItem
                    key={item.id}
                    room={item}  // 传递酒店数据到SearchItem组件
                    onAddToCart={addToCart} // 传递添加到购物车的函数
                  />
                ))}
              </div>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
