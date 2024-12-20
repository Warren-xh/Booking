import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./pages/Home/Home";
import Signup from "./Signup";
import Logon from "./Logon";

//import firebase from "./firebase.js";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}
