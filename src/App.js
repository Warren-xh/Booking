import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Hotel from "./pages/hotel/Hotel.jsx";
import List from "./pages/list/List.jsx";
import Signup from "./pages/Signup/Signup.js";
import Logon from "./pages/Logon/Logon.js";
import Order from "./pages/order/order.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/logon" element={<Logon/>}/>
        <Route path="/order" element={<Order/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
