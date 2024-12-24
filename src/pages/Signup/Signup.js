import React, { useState } from "react";
import { auth } from "../../firebase.js";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Signup.css"; // 引入修改后的 Signup.css

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const history = useHistory();

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
      history.push("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h2 className="signup-h2">Sign Up</h2>
      <div className="signup-div">
        {error && <div style={{ color: "red" }}>{error}</div>}
        {successMessage && (
          <div style={{ color: "green" }}>{successMessage}</div>
        )}
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
        <p className="signup-p">
          Already registered? <Link to="/logon">Login</Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
