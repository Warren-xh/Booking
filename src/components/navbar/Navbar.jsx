import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./navbar.css";
import logo from "./logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setEmail(user.email);
    }
  }, []);

  const handleLogin = () => {
    navigate("/logon");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
      <div className="navbar">
        <div className="navContainer">
          <img src={logo} alt="Logo" className="logoImage" />
          <span className="logo">CS385FZ Reservation</span>
          <span>Welcome: {email || "Guest"}</span>
          <div className="navItems">
            <button className="navButton" onClick={handleSignup}>
              Register
            </button>
            <button className="navButton" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
