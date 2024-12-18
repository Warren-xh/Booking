import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
