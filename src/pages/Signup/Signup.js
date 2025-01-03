import React, { useState } from "react";
import { auth } from "../../firebase.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Signup.css"; // 引入修改后的 Signup.css

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Sign-up successful! Welcome!");
      setEmail("");
      setPassword("");
      setPassword2("");
      history("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-div">
        <h2 className="signup-h2">Sign Up</h2>
        {/* Error and success message handling */}
        {error && <p className="signup-p error">{error}</p>}
        {successMessage && <p className="signup-p success">{successMessage}</p>}

        {/* Form for signup */}
        <form onSubmit={handleSubmit} className="signup-form">
          <div>
            <label className="signup-label">Email: </label>
            <input
              type="email"
              name="email"
              className="signup-input"
              value={email}
              placeholder="Your Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="signup-label">Password: </label>
            <input
              type="password"
              name="password"
              className="signup-input"
              value={password}
              placeholder="Your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="signup-label">Confirm Password: </label>
            <input
              type="password"
              name="password2"
              className="signup-input"
              value={password2}
              placeholder="Confirm Your Password"
              required
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <button type="submit" className="signup-button">
            Submit
          </button>
        </form>

        {/* Link to the login page */}
        <p className="signup-p">
          Already registered? <Link to="/logon">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
