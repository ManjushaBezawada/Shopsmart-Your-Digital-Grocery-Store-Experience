import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart, user }) => {
  const navigate = useNavigate();

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  const placeOrder = async (items) => {
    try {
      await axios.post("http://localhost:5000/order", {
        items,
        user: user?.name || "guest",
      });
      alert("✅ Order placed!");
      setCart([]);
      navigate("/orders", { state: { user: user?.name || "guest" } });
    } catch {
      alert("⚠️ Error placing order");
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0); // 🧮 Total

  return (
    <div className="container mt-4">
      <h3>🛒 Your Cart</h3>
      <ul className="list-group mb-3">
        {cart.map((item, index) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={index}
          >
            {item.name} - ₹{item.price}
            <div>
              <button
                className="btn btn-danger btn-sm mr-2 btn-animate"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
              <button
                className="btn btn-warning btn-sm btn-animate"
                onClick={() => placeOrder([item])}
              >
                Buy Now
              </button>
            </div>
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <div className="text-end">
          <h5 className="mb-3">Total: ₹{totalAmount}</h5>
          <button
            className="btn btn-primary btn-animate"
            onClick={() => placeOrder(cart)}
          >
            Place All Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
