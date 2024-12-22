import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Logon from "./pages/Logon/Logon";

// import firebase from "./firebase.js";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route path="/home" component={Home} />
          <Route path="/logon" component={Logon} />
        </Switch>
      </Router>
    </div>
  );
}
