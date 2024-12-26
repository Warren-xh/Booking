import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format, differenceInDays } from "date-fns";
import { DateRange } from "react-date-range";
import { hotelData } from "./data";

const List = () => {
  const location = useLocation();

  const [destination, setDestination] = useState(location.state?.destination || "");
  const [date, setDate] = useState(location.state?.date || []);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state?.options || {});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);

  const selectedDays = differenceInDays(date[0]?.endDate, date[0]?.startDate) || 1;

  // 从 localStorage 获取购物车数据
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, [])

  // 搜索酒店
  const handleSearch = () => {
    const results = hotelData.filter(
      (item) =>
        item.location.toLowerCase().includes(destination.toLowerCase()) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

// 添加酒店到购物车
  const addToCart = (hotel) => {
    const existingHotelIndex = cart.findIndex(
      (item) => item.id === hotel.id && item.nights === selectedDays
    );

    let updatedCart;
    if (existingHotelIndex === -1) {
      // 如果购物车中没有该酒店，直接添加
      updatedCart = [...cart, { ...hotel, nights: selectedDays, quantity: 1 }];
    } else {
      // 如果购物车中已有该酒店，增加数量
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
              <table className="resultTable">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Price (per night)</th>
                    <th>Total Price (for {selectedDays} night{selectedDays > 1 ? "s" : ""})</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="hotelImage"
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.location}</td>
                      <td>{item.description}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>${(item.price * selectedDays).toFixed(2)}</td>
                      <td>
                        <button
                          className="addToCartButton"
                          onClick={() => addToCart(item)}
                        >
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
