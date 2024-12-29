import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Hotel from "./pages/hotel/Hotel.jsx";
import List from "./pages/list/List.jsx";
import Signup from "./pages/Signup/Signup.js";
import Logon from "./pages/Logon/Logon.js";
import Order from "./pages/order/order.jsx";
import AboutUs from "./pages/aboutUs/aboutUs.jsx";
import ScrollToTop from "./pages/ScrollToTop.jsx";
import Maynooth from "./pages/maynooth/maynooth.jsx";
import FZU from "./pages/fzu/fzu.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/maynooth" element={<Maynooth />} />
        <Route path="/hotels/fzu" element={<FZU />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logon" element={<Logon />} />
        <Route path="/order" element={<Order />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
