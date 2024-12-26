import React, { useState } from "react";
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Logon.css"; // 引入修改后的 Logon.css

function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Success! Welcome");
      history("/"); // 使用 history 来跳转
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
