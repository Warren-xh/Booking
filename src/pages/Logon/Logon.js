import React, { useState } from "react"; // For state management
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Logon.css";

function Logon() {
  // Declare state variables to manage user input for email and password, as well as error and success messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

   // Use useNavigate to get the navigation function, allowing for page redirection
  const history = useNavigate();

  // Function to handle login event
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call Firebase's signInWithEmailAndPassword method to authenticate the user
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Success! Welcome");
      // Use history to jump
      history("/"); 
    } catch (err) {
      setError(err.message);
      console.error("Fail login:", err.message);
    }
  };

  return (
    <div className="logon-body">
      <div className="logon-login-container">
        <h2 className="logon-header">Login</h2>
        <form onSubmit={handleLogin} className="logon-login-form">
          <div className="logon-form-group">
            <label className="logon-label">Email: </label>
            <input
              type="email"
              className="logon-input"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="logon-form-group">
            <label className="logon-label">Password: </label>
            <input
              type="password"
              className="logon-input"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="logon-button">
            Submit
          </button>
        </form>
        {error && <p className="logon-error-message">{error}</p>}
        {successMessage && (
          <p className="logon-success-message">{successMessage}</p>
        )}
        <p className="logon-signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Logon;
