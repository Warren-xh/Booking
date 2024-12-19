import React, { useState } from "react";
import { auth } from "./firebase.js";
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // 登录成功后的处理逻辑，例如跳转到主页
      history.push("/home");
    } catch (err) {
      setError(err.message);
      console.error("登录失败:", err.message);
    }
  };

  return (
    <div>
      <h2>登录</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>电子邮件:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>密码:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">登录</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Logon;
