import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const username = location.state?.user || "guest"; // Get the username from route state

  // Fetch orders for the current user
  const fetchOrders = () => {
    axios.get(`http://localhost:5000/orders/${username}`)
      .then((res) => setOrders(res.data))
      .catch(() => alert("⚠️ Could not load orders"));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Clear all orders from DB
  const clearOrders = async () => {
    const confirm = window.confirm("⚠️ Are you sure you want to delete ALL orders?");
    if (!confirm) return;

    try {
      await axios.delete("http://localhost:5000/clear-orders");
      alert("✅ All orders cleared!");
      setOrders([]);
    } catch {
      alert("❌ Failed to clear orders");
    }
  };

  return (
    <div className="container mt-4">
      <h3>📦 Your Orders</h3>

      <button className="btn btn-danger mb-3 btn-animate" onClick={clearOrders}>
        Clear All Orders
      </button>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="card mb-3 p-3 shadow-sm">
            <p><strong>User:</strong> {order.user}</p>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>{item.name} – ₹{item.price}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
