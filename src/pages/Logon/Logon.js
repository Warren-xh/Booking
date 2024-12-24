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
      // 登录成功后的处理逻辑，例如跳转到主页
      setSuccessMessage("Success! Welcome");
      // 可选：跳转到主页
      // history.push('/home');
    } catch (err) {
      setError(err.message);
      console.error("Fail login:", err.message);
    }
  };

  return (
    <div className="logon-login-container">
      <h2 className="logon-header">Login</h2>
      <form onSubmit={handleLogin} className="logon-login-form">
        <div className="logon-form-group">
          <label className="logon-label">Email: </label>
          <input
            type="email"
            className="logon-input"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="logon-button">
          Submit
        </button>
        {error && <p className="logon-error-message">{error}</p>}
        {successMessage && (
          <p className="logon-success-message">{successMessage}</p>
        )}
      </form>
    </div>
  );
}

export default Logon;
