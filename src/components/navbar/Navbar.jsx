import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null); // 使用 useState 管理 email

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setEmail(user.email); // 更新 email 状态
    }
  }, []); // 只在组件首次渲染时获取用户信息

  const handleLogin = () => {
    navigate("/logon");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">C5385FZ Reservation</span>
        <span>Welcome: {email || "Guest"}</span> {/* 默认显示 "Guest" */}
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
