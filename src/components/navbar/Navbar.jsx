import { useNavigate } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/logon");
  }

  const handleSignup = () => {
    navigate("/signup");
  }


  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">booking</span>
        <div className="navItems">
          <button className="navButton" onClick={handleSignup}>Register</button>
          <button className="navButton" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar