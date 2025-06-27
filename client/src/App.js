import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Auth from "./components/Auth";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
          <Link className="navbar-brand font-weight-bold" to="/">ShopSmart: 🔍GroceryStore</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">🏠Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">🛒Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">📦Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/auth">🔐Login/Signup</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
