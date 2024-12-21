import React, { useState } from "react";
import { auth } from "./firebase.js";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {successMessage && (
          <div style={{ color: "green" }}>{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Your Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password: </label>
            <input
              type="password"
              name="password2"
              value={password2}
              placeholder="Confirm Your Password"
              required
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>
          Already registered? <Link to="/logon">Login</Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
